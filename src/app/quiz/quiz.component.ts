import { DOCUMENT, NgFor } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { User } from '../authorization/signup/User';
import { ModalComponent } from '../modal/modal.component';
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

  seconds = 0;
  minutes = 0;
  hours = 0;
  formatted_sec: any = '00';
  formatted_min: any = '00';
  formatted_hr: any = '00';
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

  qNo: number = 1;
  optionType: string = '';
  cbOptions: string = '';

  currentDate = new Date();
  startTime: any = null;
  result: any = null;

  @ViewChild('option')
  radioOption: any;

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
  quizInfo: any;
  totalAttempt: number = 0;
  duration: number = 0;
  fsAttempt = 2;


  subSkillsQCount: Map<string, number> = new Map();
  subSkillsACount: Map<string, number> = new Map();
  subSkillsPercent: Map<string, number> = new Map();

  constructor(private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: any,
    private dialog: MatDialog
  ) {

  }


  ngOnInit(): void {

    this.elem = this.document.documentElement;


    this.route.paramMap.subscribe(
      (param) => {
        this.quizName = param.get('name')!;
      }
    );

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.startTime = new Date(JSON.parse(localStorage.getItem('startTime')!));

    this.getAllQuestions();

  }

  @HostListener('document:visibilitychange')
  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  openDialog() {

    if (!this.document.fullscreen) {
      if (this.fsAttempt !== 0) {
        this.dialog.open(
          ModalComponent,
          {
            disableClose: false,
            data: {
              attempt: this.fsAttempt
            }
          }
        )
        this.fsAttempt--;
      }
      else {
        this.finish();
        this.dialog.open(
          ModalComponent,
          {
            disableClose: false,
            data: {
              attempt: this.fsAttempt
            }
          }
        )
      }
    }

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

  getQuizInfo(quiz: string) {
    this.quizService.getQuizInfo(quiz).subscribe(
      (data) => {
        this.quizInfo = data;
        console.log(this.quizInfo)
        this.totalAttempt = this.quizInfo.noOfAttempts;
        this.duration = Number(this.quizInfo.duration.split(" ", 1)[0]);
        console.log(this.duration)
        this.clock()
      }
    )
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
    this.getQuizInfo(this.quizName);
    if (this.quizName === 'Java') {
      this.quizService.getAllJavaQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'Mongodb') {
      this.quizService.getAllMongoQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'Html') {
      this.quizService.getAllHtmlQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'JavaBasic') {
      this.quizService.getAllJavaBasicQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'JavaIntermediate') {
      this.quizService.getAllJavaInterQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'JavaAdvance') {
      this.quizService.getAllJavaAdvanceQuestions().subscribe(
        (question) => {
          this.allQuestions = question
          this.randomQuestions();
          this.assignQuestions();

          console.log(this.displayQuestions)
        }
      );
    }
    else if (this.quizName === 'Angular') {
      this.quizService.getAllAngularQuestions().subscribe(
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
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.optionType = this.displayQuestions[this.currentIndex].qType;
  }

  onChange(option: string, target: any) {
    if (target.checked) {
      if (this.cbOptions === '') {
        this.cbOptions = this.cbOptions.concat(option)
      }
      else {
        this.cbOptions = this.cbOptions.concat(", ", option)
      }
      this.options[this.currentIndex] = this.cbOptions
      console.log(this.options)
    }
    else {
      this.cbOptions = this.cbOptions.replace(", " + option, "")
      this.options[this.currentIndex] = this.cbOptions
    }

    console.log(this.cbOptions)
  }

  nextQuestion() {
    if (this.counter <= this.displayQuestions.length) {
      this.counter++;
    }
    this.currentIndex = this.counter;
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.optionType = this.displayQuestions[this.currentIndex].qType;
    if(this.radioOption.dirty){
      this.attended++;
    }
    this.qNo++;
  }



  prevQuestion() {
    this.counter--;
    this.currentIndex = this.counter;
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.optionType = this.displayQuestions[this.currentIndex].qType;
    this.attended--;
    this.qNo--;
  }



  clock() {
    let stoptimer = setInterval(myClock, 1000);
    var c = this.duration * 60;

    if (c === 0) {
      this.finish()
    }

    function myClock() {
      var timer = document.getElementById("timer")
      --c
      var seconds = c % 60; // Seconds that cannot be written in minutes
      var secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
      var minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
      var hours = (secondsInMinutes - minutes) / 60;

      var f_h = hours.toString();
      var f_m = minutes.toString();
      var f_s = seconds.toString();

      if (f_h.length < 2) f_h = "0" + f_h;
      if (f_m.length < 2) f_m = "0" + f_m;
      if (f_s.length < 2) f_s = "0" + f_s;

      if(f_h=="00"){
        timer!.innerText = f_m + "M: " + f_s + "S"
      }
      else{
      timer!.innerText = f_h + "H: " + f_m + "M: " + f_s + "S"
      }

      if (c == 0) {
        clearInterval(stoptimer);
      }
    }
  }

  timediff(st: any, et: any) {
    let diff = et - st;
    let elpTime = Math.floor((diff / 1000))
    var seconds = elpTime % 60; // Seconds that cannot be written in minutes
    var secondsInMinutes = (elpTime - seconds) / 60; // Gives the seconds that COULD be given in minutes
    var minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
    var hours = (secondsInMinutes - minutes) / 60;

    var f_h = hours.toString();
    var f_m = minutes.toString();
    var f_s = seconds.toString();



    if (f_h = "00") {
      return `${f_m} m`
    }
    else {
      return `${f_h} h:${f_m} m`
    }
  }

  finish() {
    let end = new Date();

    let timeElapsed = this.timediff(this.startTime, end);
    console.log(timeElapsed);

    for (let i = 0; i < this.displayQuestions.length; i++) {
      if (this.options[i] != null) {
        if (this.displayQuestions[i].qType = 'Single') {
          if (this.displayQuestions[i].correctAnswer == this.options[i]) {
            this.rightAnswer++;
            this.subSkillsACount.set(this.displayQuestions[i].subSkill, this.subSkillsACount.get(this.displayQuestions[i].subSkill)! + 1)
          }
          else {
            this.wrongAnswer++;
          }
        }
        else {
          let sa = this.options[i].split(",")
          let ca = this.displayQuestions[i].correctAnswer.split(",")
          if (ca.every((s: string) => sa.includes(s))) {
            this.rightAnswer++;
          }
          else {
            this.wrongAnswer++;
          }
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
            this.totalAttempt,
            1,
            timeElapsed
          );
        }
        else if (this.existingResult.length !== this.existingResult[this.existingResult.length - 1].totalAttempt) {
          let index = this.existingResult.length;
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
            this.totalAttempt,
            this.totalAttempt - this.existingResult[index - 1].attempt,
            timeElapsed
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
