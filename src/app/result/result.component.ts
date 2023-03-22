import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { AuthService } from '../authorization/auth.service';
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
  quiz: string = '';
  questions: any;
  correct: any;
  incorrect: any;
  percent: any;
  answered: any;
  date: any;
  startTime: any;
  currentDate: Date = new Date();
  data: Map<string, number> = new Map();
  skills: any;
  pArray: number[] = [];
  interData: Map<string, number> = new Map();
  expertData: Map<string, number> = new Map();
  beginner: Map<string, number> = new Map();

  constructor(private route: ActivatedRoute, private quizService: QuizService, private authService: AuthService) {

  }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (param) => {
        this.quiz = param.get('name')!;
      }
    );

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.showResult();

     
  }



  showResult() {
    this.quizService.getResult(this.currentUser.userName, this.quiz, `${this.currentDate.toJSON().slice(0, 10)}`).subscribe(
      (result) => {
        this.result = result
        this.correct = result.correct
        this.questions = this.result.correct + this.result.incorrect;
        this.percent = (this.correct / this.questions) * 100;
        this.answered = result.answered
        this.incorrect = result.incorrect
        this.date = result.date;
        this.startTime = result.startTime
        this.skills = result.skills;
        this.pArray = result.percent
       
        for(let i=0;i<this.pArray.length;i++){
          
          if(this.pArray[i]>=70){
            this.expertData.set(this.skills[i],this.pArray[i])
          }
          else if(this.pArray[i]>=40 && this.pArray[i]<70){
            this.interData.set(this.skills[i],this.pArray[i])
          }
          else{
            if(this.pArray[i]<40)
            this.beginner.set(this.skills[i],this.pArray[i])
            }
          }
        
          this.createChart();
        }
      
    );

  }

  createChart() {

    const innerBarText = {
      id: 'innerBarText',
      afterDatasetsDraw(chart:any, args:any, pluginOptions:any){
         const { ctx, data, chartArea: {left}, scales: {x,y}} = chart

         ctx.save()
         data.datasets[0].data.forEach(
          (dataPoint: any,index:any) => {
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle=data.datasets[index];
            ctx.fillText(`${data.labels[index]} (${dataPoint}%)`, left+10, y.getPixelForValue(index))
          }
         )
      }
    }

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.result.skills,
        datasets: [{
          backgroundColor: this.assignColor(),
          data: this.result.percent,
          minBarLength: 10
        },
        ]
      },
      plugins: [innerBarText],
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },

        scales: {
            x: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 10
              }
            }
        }
      }
    });


    
  }

  assignColor(){
    let colors = [];
    for(let p of this.result.percent)
    if(p >= 70){
      colors.push('#50C878')
    }
    else if(p > 0 && p < 70){
      colors.push('#fdad5c')
    }
    else{
      if(p ===0)
      colors.push('red')
    }
    return colors;
  }

  logout() {
    this.authService.loggedOut();
  }

}
