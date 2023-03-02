import { Component } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent {
  questions: any[] = [];
  category: any[] = [];

  constructor(private quizService: QuizService){

  }

  fileUpload(event: any){
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type: 'binary'});
      let sheets = workbook.SheetNames;
      console.log("Sheet Names "+sheets)
     
          const questions = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]]);
          this.questions = questions;
          console.log(this.questions)

          const category = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[1]]);
          this.category = category;
          console.log(this.category);
         
        
          this.quizService.addQuestion(this.questions).subscribe(
            (questions) => console.log(questions)
          );

          this.quizService.addCategory(this.category).subscribe(
            (category) => console.log(category)
          );
     
      console.log(workbook);
     
    }
  
  }
}
