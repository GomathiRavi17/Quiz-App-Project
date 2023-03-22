import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { User } from '../authorization/signup/User';
import { EnablefsComponent } from '../enablefs/enablefs.component';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);

  }

  logout() {
    this.authService.loggedOut();
  }

  startTime() {
    localStorage.setItem("startTime", JSON.stringify(new Date()))
  }

  openFullscreen() {
    // if (this.elem.requestFullscreen) {
    //   this.elem.requestFullscreen();
    // } else if (this.elem.mozRequestFullScreen) {
    //   /* Firefox */
    //   this.elem.mozRequestFullScreen();
    // } else if (this.elem.webkitRequestFullscreen) {
    //   /* Chrome, Safari and Opera */
    //   this.elem.webkitRequestFullscreen();
    // } else if (this.elem.msRequestFullscreen) {
    //   /* IE/Edge */
    //   this.elem.msRequestFullscreen();
    // }
    this.document.getElementsByTagName('body')[0].requestFullscreen();
  }

  checkQuizAlreadyTaken(quizName: string) {
    this.quizService.getResultByName(this.currentUser.userName, quizName).subscribe(
      (result) => {
        next: {
          this.result = result;

          console.log(this.result)
          if (this.result == null) {

            this.dialog.open(EnablefsComponent,
              {
                data: {
                  quiz: quizName
                }
              }
            )
            this.startTime();
          }
          else if (this.result.length !== this.result[this.result.length - 1].totalAttempt) {

            let index = this.result.length;

            alert("You are only left with " + (this.result[index - 1].totalAttempt - this.result[index - 1].attempt) + " attempt!");
            this.dialog.open(EnablefsComponent,
              {
                data: {
                  quiz: quizName
                }
              }
            )


            this.startTime();

          }
          else if (this.result.length === this.result[this.result.length - 1].totalAttempt) {
            alert("You are already taken the maximum no.of.times. No more attempt left to take!")
          }
        }
      }
    );



  }
}
