import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { User } from '../authorization/signup/User';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  elem: any;
  currentUser: User = {
    userName: '',
    email: '',
    password: '',
    active: false,
    role: ''
  }
  result: any;
    
   constructor(
    private authService: AuthService,  
    @Inject(DOCUMENT) private document: any,
    private quizService: QuizService,
    private router: Router
    ){
   }

   ngOnInit(): void {
    this.elem = document.documentElement;
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);

   }

   logout(){
    this.authService.loggedOut();
   }

   startTime(){
    localStorage.setItem("startTime",JSON.stringify(new Date()))
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

  checkQuizAlreadyTaken(quizName: string){
    this.quizService.getResultByName(this.currentUser.userName, quizName).subscribe(
      (result) => {
         next: {
          this.result = result;
       
        console.log(this.result)
        if(this.result==null){
          // this.openFullscreen()
          this.router.navigate(['quiz', quizName])
          this.startTime();
        }
        else if(this.result[0].quizName === quizName && this.result[0].attempt===1 && this.result.length === 1 ){
          console.log(quizName)
          console.log(this.result[0].quizName)
          alert("You are only left with one attempt!");
          // this.openFullscreen()
          
          this.router.navigate(['quiz', quizName])
          this.startTime();
        }
        else if(this.result[1].quizName === quizName && this.result[1].attempt===2 && this.result.length === 1 ){
          //  this.openFullscreen()
          alert("You are already taken the test twice. No more attempt left to take!")
        }
      }
      }
    );

   
   
  }
}
