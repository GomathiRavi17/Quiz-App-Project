import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../authorization/signup/User';
import { QuizService } from '../service/quiz.service';
import { Result } from './result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  currentUser: User = {
    userName: '',
    email: '',
    password: '',
    active: false,
    role: ''
  }

  result: any = null;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.showResult();
  }

 

  showResult() {
   this.quizService.getResultByName(this.currentUser.userName).subscribe(
    (result) => this.result = result
   );
     
  }


}
