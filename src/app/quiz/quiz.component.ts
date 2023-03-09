import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Anchor } from 'chartjs-plugin-datalabels/types/options';
import { empty } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { User } from '../authorization/signup/User';
import { Result } from '../result/result';
import { QuizService } from '../service/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  allQuestions: any[] = [];
  displayQuestions: any[] = [];
  quizName: string = '';
  currentUser: User = {
    userName: '',
    email: '',
    password: '',
    active: false,
    role: ''
  }
  rightAnswer: number = 0;
  wrongAnswer: number = 0;
  answered: number = 0;
  unanswered: number = 0;
  attended: number = 1;
  elem: any;
  stopTimer: any;
  time = 0;
  dt = new Date(new Date().setTime(0));
  ctime = this.dt.getTime();
  seconds = Math.floor((this.ctime % (1000 * 60)) / 1000);
  minutes = Math.floor((this.ctime % (1000 * 60 * 60)) / (1000 * 60));
  formatted_sec: any = '00';
  formatted_min: any = '00';
  category: any[] = [];
  currentIndex = 0;
  currentQuestion: any = '';
  counter: number = 0;
  option1: any = '';
  option2: any = '';
  option3: any = '';
  option4: any = '';
  id: any = '';
  options: any = [];
  panelsts: boolean = false;
  qNo: number = 1;
  optionType: string = '';

  currentDate = new Date();
  startTime: any = null;
  result: any = null;


  totalQuestions = 0;
  beginner = 0;
  intermediate = 0;
  expert = 0;

  bCount = 0;
  iCount = 0;
  eCount = 0;

  skills: any = [];
  percent: any = [];
  existingResult: any;

  subSkillsQCount: Map<string, number> = new Map();
  subSkillsACount: Map<string, number> = new Map();
  subSkillsPercent: Map<string, number> = new Map();

  


  constructor(private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: any
  ) {

  }


  ngOnInit(): void {
    this.elem = this.document.documentElement;
    // this.openFullscreen()
    this.timer();
    this.route.paramMap.subscribe(
      (param) => {
        this.quizName = param.get('name')!;
      }
    );

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.startTime = new Date(JSON.parse(localStorage.getItem('startTime')!));

    this.getAllQuestions();

  }

  getCategory(qName: string) {
    this.quizService.getCategoryByqName(qName).subscribe(
      (category) => {
        this.category = category
        console.log(category)
        this.category.forEach(
          (c) => {
            this.totalQuestions += Number(c.questionsToBeSelected);
          }
        );

        this.beginner = Number(this.category[0].questionsToBeSelected);

        this.intermediate = Number(this.category[1].questionsToBeSelected);

        this.expert = Number(this.category[2].questionsToBeSelected);

      }
    );

  }

  randomQuestions() {

    while (this.displayQuestions.length < this.totalQuestions) {

      const randomIndex = Math.floor(Math.random() * this.allQuestions.length);
      console.log(randomIndex);

      const item = this.allQuestions[randomIndex];



      if (this.displayQuestions.includes(item)) {
        continue
      }



      if ((item.level === 'Beginner') && (this.bCount !== this.beginner)) {
        this.bCount++;
        this.displayQuestions.push(item);
      }
      else if ((item.level === 'Intermediate') && (this.iCount !== this.intermediate)) {
        this.iCount++;
        this.displayQuestions.push(item);
      }
      else if ((item.level === 'Expert') && (this.eCount !== this.expert)) {
        this.eCount++;
        this.displayQuestions.push(item);
      }
      else {
        continue
      }


    }

    this.displayQuestions.forEach(q => this.subSkillsQCount.set(q.subSkill, 0))
    this.displayQuestions.forEach(q => this.subSkillsACount.set(q.subSkill, 0))
    this.displayQuestions.forEach(q => this.subSkillsPercent.set(q.subSkill, 0))


    for (let i = 0; i < this.displayQuestions.length; i++) {
      this.subSkillsQCount.set(this.displayQuestions[i].subSkill, this.subSkillsQCount.get(this.displayQuestions[i].subSkill)! + 1)
    }

    console.log("subskills question count")
    this.subSkillsQCount.forEach((k, v) => console.log(k, v));

  }

  getAllQuestions() {
    this.getCategory(this.quizName);
    if(this.quizName==='Java') {
    this.quizService.getAllJavaQuestions().subscribe(
      (question) => {
        this.allQuestions = question
        this.randomQuestions();
        this.assignQuestions();

        console.log(this.displayQuestions)
      }
    );
    }
    else if(this.quizName==='Mongodb'){
      this.quizService.getAllMongoQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();
  
          console.log(this.displayQuestions)
        }
      );
    }
    else if(this.quizName==='Html'){
      this.quizService.getAllHtmlQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();
  
          console.log(this.displayQuestions)
        }
      );
    }
  }

  assignQuestions() {
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
    // this.optionType = this.displayQuestions[this.currentIndex].qType;
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
  }



  nextQuestion() {
    if (this.counter <= this.displayQuestions.length) {
      this.counter++;
    }
    this.currentIndex = this.counter;
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
    // this.optionType = this.displayQuestions[this.currentIndex].qType;
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.attended++;
    this.qNo++;
  }

  prevQuestion() {
    this.counter--;
    this.currentIndex = this.counter;
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
    // this.optionType = this.displayQuestions[this.currentIndex].qType;
    console.log(this.currentQuestion)
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.attended--;
    this.qNo--;
  }

  timer() {
    this.stopTimer = setInterval(
      () => {
        // this.time++
        if (this.seconds < 59) {
          this.seconds++
        }
        else {
          this.seconds = 0;
          this.minutes++;
        }
        this.formatted_sec = this.formatted_sec < 10 ? `0${this.seconds}` : `${this.seconds}`;
        this.formatted_min = this.formatted_min < 10 ? `0${this.minutes}` : `${this.minutes}`;
      },
      1000
    )
  }

  finish() {
    let end = new Date();

    for (let i = 0; i < this.displayQuestions.length; i++) {
      if (this.options[i] != null) {
        if (this.displayQuestions[i].correctAnswer == this.options[i]) {
          this.rightAnswer++;
          this.subSkillsACount.set(this.displayQuestions[i].subSkill, this.subSkillsACount.get(this.displayQuestions[i].subSkill)! + 1)
        }
        else {
          this.wrongAnswer++;
        }
      }
    }

    console.log("subskills correct answer count")
    this.subSkillsACount.forEach((k, v) => console.log(k, v));

    this.subSkillsPercent.forEach((v, k) => {
      this.subSkillsPercent.set(k, (this.subSkillsACount.get(k)! / this.subSkillsQCount.get(k)!) * 100)
    }
    )

    console.log("subskills percentage")
    this.subSkillsPercent.forEach((v, k) => {
      console.log(k, v)
      this.skills.push(k);
      this.percent.push(v);
    });

    console.log(this.options)
    this.options.forEach(
      (option: string) => {
        if (option == undefined) {
          this.unanswered++;
        }
        else {
          this.answered++;
        }
      }
    );





    this.quizService.getResultByName(this.currentUser.userName, this.quizName).subscribe(
      (data) => {
        this.existingResult = data;
        console.log(this.existingResult)

        if (this.existingResult == null) {
          this.result = new Result(
            this.currentUser.userName,
            this.currentUser.email,
            this.quizName,
            `${this.currentDate.toJSON().slice(0, 10)}`,
            this.answered,
            this.unanswered,
            this.rightAnswer,
            this.wrongAnswer,
            this.skills,
            this.percent,
            `${this.startTime.toTimeString().slice(0, 8)}`,
            `${end.toTimeString().slice(0, 8)}`,
            1
          );
        }
        else if (this.existingResult[0].attempt === 1 && this.existingResult.length === 1) {
          this.result = new Result(
            this.currentUser.userName,
            this.currentUser.email,
            this.quizName,
            `${this.currentDate.toJSON().slice(0, 10)}`,
            this.answered,
            this.unanswered,
            this.rightAnswer,
            this.wrongAnswer,
            this.skills,
            this.percent,
            `${this.startTime.toTimeString().slice(0, 8)}`,
            `${end.toTimeString().slice(0, 8)}`,
            2
          );
        }

        this.quizService.addResult(this.result).subscribe(
          (data) => {
            console.log(data)
            this.router.navigate(['result', this.quizName])
          }
        );


      }
    );





  }

  logout() {
    this.authService.loggedOut();
  }



  pressEscape(event: any){
    event.preventDefault();
    alert("you should not press escape")
    console.log(event);
    return false
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

}
