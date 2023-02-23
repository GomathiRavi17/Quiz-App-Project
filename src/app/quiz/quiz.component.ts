import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  allQuestions: any[] = [];
  quizName: string = '';
  isSubmitted: boolean = false;

  constructor(private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
 
    this.route.paramMap.subscribe(
      (param) => {
        this.quizName = param.get('name')!;
      }
    );

    this.getAllQuestions();
  }

  getAllQuestions() {
    this.quizService.getAllQuestions(`assets/${this.quizName}.json`).subscribe(
      (question) => {
        this.allQuestions = question
        this.assignQuestions();
      }
    );
  }

  assignQuestions() {
    this.currentQuestion = this.allQuestions[this.currentIndex].question;
    this.option1 = this.allQuestions[this.currentIndex].a;
    this.option2 = this.allQuestions[this.currentIndex].b;
    this.option3 = this.allQuestions[this.currentIndex].c;
    this.option4 = this.allQuestions[this.currentIndex].d;
    this.id = this.allQuestions[this.currentIndex].id;
  }

  currentIndex = 0;
  currentQuestion: any = '';
  counter: number = 0;
  option1: any = '';
  option2: any = '';
  option3: any = '';
  option4: any = '';
  id: any = '';
  options: any = [];
  rightAnswer: number = 0;
  wrongAnswer: number = 0;
  panelsts: boolean = false;
  answered: number = 1;

  nextQuestion() {
    // this.isSubmitted = true;
    if (this.counter <= this.allQuestions.length) {
      this.counter++;
    }
    this.currentIndex = this.counter;
    this.currentQuestion = this.allQuestions[this.currentIndex].question;
    this.option1 = this.allQuestions[this.currentIndex].a;
    this.option2 = this.allQuestions[this.currentIndex].b;
    this.option3 = this.allQuestions[this.currentIndex].c;
    this.option4 = this.allQuestions[this.currentIndex].d;
    this.id = this.allQuestions[this.currentIndex].id;
    this.answered++
  }
  prevQuestion() {
    this.counter--;
    this.currentIndex = this.counter;
    this.currentQuestion = this.allQuestions[this.currentIndex].question;
    this.option1 = this.allQuestions[this.currentIndex].a;
    this.option2 = this.allQuestions[this.currentIndex].b;
    this.option3 = this.allQuestions[this.currentIndex].c;
    this.option4 = this.allQuestions[this.currentIndex].d;
    this.id = this.allQuestions[this.currentIndex].id;
    this.answered--;
  }

  finish() {
    this.router.navigate(['result', this.quizName])
    localStorage.setItem('options', JSON.stringify(this.options));

  }

 

}
