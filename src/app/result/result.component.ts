import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { Result } from './result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
  options: any[] = [];
  rightAnswer:number=0;
  wrongAnswer:number=0;
  allQuestions: any[]=[];
  resultArray :Result[] = [];
  quizName: string = '';


constructor(private route: ActivatedRoute, private quizService: QuizService){

}

ngOnInit(){
 this.route.paramMap.subscribe(
  (param) => {
    this.quizName = param.get('name')!;
  }
);

this.getAllQuestions();
this.showResult();
this.options = JSON.parse(localStorage.getItem('options')!);
}

getAllQuestions(){
  this.quizService.getAllQuestions(`assets/${this.quizName}.json`).subscribe(
    (data) => {
      this.allQuestions = data
      this.showResult();
    }
  )
}

showResult(){
  console.log(this.allQuestions);
  for (let i = 0; i < this.allQuestions.length; i++) {
    let result:any= null;
    if (this.allQuestions[i].answer == this.options[i]) {
      this.rightAnswer++;
      result = new Result(this.allQuestions[i].id,
        this.options[i],
        true,
        this.allQuestions[i].answer
        );
    this.resultArray.push(result);

    }
    else {
      this.wrongAnswer++;
      result = new Result(this.allQuestions[i].id,
        this.options[i],
        false,
        this.allQuestions[i].answer
        );
    this.resultArray.push(result);

    }
    // this.resultArray.push(result);
  }
  console.log(this.resultArray);
  console.log(this.rightAnswer);
}
}
