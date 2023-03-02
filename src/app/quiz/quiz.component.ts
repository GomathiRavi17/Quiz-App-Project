import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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


  expertQ: any[] = [];
  intermediareQ: any[] = [];
  beginnerQ: any[] = [];

  constructor(private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }


  ngOnInit(): void {

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

        console.log(this.totalQuestions)

        this.expert = Number(this.category[0].questionsToBeSelected);
        console.log(this.expert);
        this.intermediate = Number(this.category[1].questionsToBeSelected);
        console.log(this.intermediate)
        this.beginner = Number(this.category[2].questionsToBeSelected);
        console.log(this.beginner)
      }
    );

  }

  getAllQuestions() {
    this.getCategory(this.quizName);
    this.quizService.getAllQuestions().subscribe(
      (question) => {
        this.allQuestions = question
        this.segregateQuestions();
        console.log(this.beginnerQ)
        this.randomQuestions();
        this.assignQuestions();

        console.log(this.displayQuestions)
      }
    );
  }

  assignQuestions() {
    this.currentQuestion = this.displayQuestions[this.currentIndex].qText;
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
    this.currentQuestion = this.allQuestions[this.currentIndex].qText;
    this.option1 = this.displayQuestions[this.currentIndex].option1;
    this.option2 = this.displayQuestions[this.currentIndex].option2;
    this.option3 = this.displayQuestions[this.currentIndex].option3;
    this.option4 = this.displayQuestions[this.currentIndex].option4;
    this.id = this.displayQuestions[this.currentIndex].id;
    this.attended++
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
    this.attended--;
  }

  timer() {
    this.stopTimer = setInterval(
      () => {
        this.time++
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
        }
        else {
          this.wrongAnswer++;
        }
      }
    }

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

    this.result = new Result(
      this.currentUser.userName,
      this.currentUser.email,
      this.quizName,
      `${this.currentDate.toJSON().slice(0, 10)}`,
      this.answered,
      this.unanswered,
      this.rightAnswer,
      this.wrongAnswer,
      `${this.startTime.toTimeString().slice(0, 8)}`,
      `${end.toTimeString().slice(0, 8)}`,
      1
    );

    console.log(this.result)

    this.quizService.addResult(this.result).subscribe(
      (data) => this.router.navigate(['result', this.quizName])
    );

  }

  logout() {
    this.authService.loggedOut();
  }



  randomQuestions() {

    while (this.displayQuestions.length < this.totalQuestions) {

        const randomIndex = Math.floor(Math.random() * this.allQuestions.length);
        console.log(randomIndex);

        const item = this.allQuestions[randomIndex];

        

        if (this.displayQuestions.includes(item)) {
          continue
        }


       
        if( (item.level==='Beginner') && (this.bCount !== this.beginner)){
          this.bCount++;
          this.displayQuestions.push(item);
        }
        else if((item.level==='Intermediate') && (this.iCount !== this.intermediate))
        {
          this.iCount++;
          this.displayQuestions.push(item);
        }
        else if((item.level==='Expert') && (this.eCount !== this.expert)){
          this.eCount++;
          this.displayQuestions.push(item);
        }
        else{
          continue
        }
       

    }
    
  }


  segregateQuestions() {
    this.allQuestions.forEach(
      (q) => {
        if (q.level == "Expert") {
          this.expertQ.push(q)
        }
        else if (q.level == "Intermediate") {
          this.intermediareQ.push(q)
        }
        else {
          this.beginnerQ.push(q)
        }
      }
    )


  }

 
 




}
