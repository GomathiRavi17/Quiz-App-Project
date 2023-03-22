import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { QuestionService } from 'src/app/service/question.service';
import { FullscreenDialogComponent } from 'src/app/fullscreen-dialog/fullscreen-dialog.component';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route:ActivatedRoute , private questionService : QuestionService,public dialog: MatDialog, private authService: AuthService){

  }
  selectedTeam:any;
  questionArray :any=[];
  displayedColumns: string[] =['id','qtext','option1','option2','option3','option4','correctAnswer','qtype','level','category','skill','subskill','Action'];
  dataSource : any;
  ngOnInit(): void { 
    this.selectedTeam = this.route.snapshot.paramMap.get('selectedTeam')
    console.log(this.selectedTeam);
    this.getQuestionDetails();
  }

  getQuestionDetails(){
    if(this.selectedTeam=='Java'){
      this.questionService.getAllJava().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.questionArray);
      })
    }
    else if(this.selectedTeam == 'Mongodb'){
      this.questionService.getAllMongo().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      })
    }
    else if(this.selectedTeam == 'Html'){
      this.questionService.getAllHtml().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.questionArray);
      })
    }
    else if(this.selectedTeam == 'JavaBasic'){
      this.questionService.getAllJavaBasic().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.questionArray);
      })
    }
    else if(this.selectedTeam == 'JavaIntermediate'){
      this.questionService.getAllJavaIntermediate().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.questionArray);
      })
    }
    else if(this.selectedTeam == 'JavaAdvance'){
      this.questionService.getAllJavaAdvance().subscribe(data=>{
        console.log(data);
        this.questionArray = data;
        if(this.questionArray.length===0){
          alert("No datas are found to display!")
        }
        this.dataSource = new MatTableDataSource(this.questionArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.questionArray);
      })
    }
  }

  openDialog(row:any){
    this.dialog.open(FullscreenDialogComponent,{
      width:'50%',
      height:'100%',
      data:row
    })
  }

  deleteQuestion(id:number){
    if(this.selectedTeam == "Java"){
      this.questionService.deleteJava(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }else if(this.selectedTeam == "JavaBasic"){
      this.questionService.deleteJavaBasic(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }else if(this.selectedTeam == "JavaIntermediate"){
      this.questionService.deleteJavaIntermediate(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }else if(this.selectedTeam == "JavaAdvance"){
      this.questionService.deleteJavaAdvance(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }else if(this.selectedTeam == "Mongodb"){
      this.questionService.deleteMongo(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }else if(this.selectedTeam == "Html"){
      this.questionService.deleteHtml(id).subscribe(data=>{
        alert("deleted successfully");
        window.location.reload();
      })
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    this.authService.loggedOut();
  }

}
