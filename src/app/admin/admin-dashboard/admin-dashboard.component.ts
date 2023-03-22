import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';
import { QuestionService } from 'src/app/service/question.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
   collections: any;
   searchKey: string='';
   element: string = 'sequence';
   viewCard: boolean = false;

   constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    private router: Router
    ){

   }

   getCollections() {
    this.viewCard = true;
    this.questionService.getCollections().subscribe((data) => {
      this.collections = data;
      console.log(this.collections)
      this.collections.forEach((c: string,index: number) => {
        if(this.element==c){
          this.collections.splice(index,1);
        }
      })
    });
    
  }

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
  }

  ngOnInit(){
   
  }

  viewQuestion(qName: any) {
    this.router.navigate(['view-question/', qName]);
  }

   logout(){
    this.authService.loggedOut();
   }
}
