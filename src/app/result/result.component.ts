import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { User } from '../authorization/signup/User';
import { QuizService } from '../service/quiz.service';


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
  chart: any;
  quiz: string ='';
  questions: any;
  
  constructor(private route: ActivatedRoute, private quizService: QuizService) {

  }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (param) =>{
        this.quiz = param.get('name')!;
      }
    );

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.showResult();
   
  
  }

 

  showResult() {
   this.quizService.getResultByNameAndqName(this.currentUser.userName, this.quiz).subscribe(
    (result) =>
    {
         this.result = result
         this.questions = this.result.correct + this.result.incorrect;
         this.createChart();
    }
   ); 
     
  }

  createChart(){

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.result.skills,
        datasets: [{
          backgroundColor: '#50C878',
          data: this.result.percent
        },
      ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
        legend: {
          display: false
        },
      
      },
      
    //   scales: {
    //     yAxes: {
    //       ticks: {
    //          mirror: true,
    //          align: 'center',
    //          color: "black"
    //       },
    //     }
    // }
      }
    });
    
  
  }

}
