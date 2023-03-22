import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../authorization/auth.service';
import { QuizService } from '../../service/quiz.service';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { EditResultComponent } from '../edit-result/edit-result.component';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit{
  results: any;
  dataSource: any;
  displayedColumns: string[] = ['id','name','email','quizName','date','percentage','attempt', 'totalAttempt']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("resultSort")sort: MatSort = new MatSort;

 constructor(private quizService: QuizService, private authService: AuthService, private dialog: MatDialog){

 }

  ngOnInit(){
   this.getAllResults();
   this.dataSource.sort = this.sort;
  }

  getAllResults(){
    this.quizService.getAllResults().subscribe(
      (data) => {
        this.results = data
        this.dataSource = new MatTableDataSource(this.results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  logout(){
    this.authService.loggedOut()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel(event: any) {
	  const fileName = 'result.xlsx';

		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.results);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'result');

		XLSX.writeFile(wb, fileName);
  }

  
  openDialog(row:any){
    this.dialog.open(EditResultComponent,{
      width:'50%',
      height:'100%',
      data:row
    })
  }
}
