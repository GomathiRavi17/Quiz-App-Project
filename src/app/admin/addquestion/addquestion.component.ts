import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  questions: any[] = [];
  category: any[] = [];
  questionArray: any = [];
  viewTable: boolean = false;
  items: any = [];
  selectedTeam = '';
  fileName: any;
  question: string = '';
  collectionNames: any = [];
  searchKey: string = '';
  quizInfo: any[] = [];



  constructor(
    private quizService: QuizService,
    private router: Router,
    private questionService: QuestionService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {

  }
  ngOnInit() {
    this.question = 'questions';
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    console.log(this.selectedTeam);
  }

  DataEmittedFromEvent(data: any) {
    console.log(data);
  }

  fileUpload(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      let sheets = workbook.SheetNames;
      console.log("Sheet Names " + sheets)

      const questions = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]]);
      this.questions = questions;
      console.log(this.questions)


      const category = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[1]]);
      this.category = category;
      console.log(this.category);

      const quizInfo = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[2]]);
      this.quizInfo = quizInfo;
      console.log(this.quizInfo);

      if (this.selectedTeam == 'Java') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addJava',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      } else if (this.selectedTeam == 'Mongodb') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addMongo',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data: any) => {
          console.log(data);
        });
      } else if (this.selectedTeam == 'Html') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addHtml',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      } else if (this.selectedTeam == 'JavaBasic') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addJavaBasic',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      } else if (this.selectedTeam == 'JavaIntermediate') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addJavaIntermediate',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      } else if (this.selectedTeam == 'JavaAdvance') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addJavaAdvance',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      }
      else if (this.selectedTeam == 'Angular') {
        let upload = this.httpClient.post(
          'http://localhost:8011/question/addAngular',
          this.questions
        );
        alert("File uploaded successfully!")
        upload.subscribe((data) => {
          console.log(data);
        });
      }


      // this.quizService.addQuestion(this.questions).subscribe(
      //   (questions) => console.log(questions)
      // );

      this.quizService.addCategory(this.category).subscribe(
        (category) => console.log(category)
      );

      this.quizService.addQuizInfo(this.quizInfo[0]).subscribe(
        (quizInfo) => console.log(quizInfo)
      );

      console.log(workbook);

    }

  }

  downloadTemplate() {
    const fileName = 'Question-Template.xlsx';

    const questionJson = [{
      "qType": "", "level": "", "category	": "",
      "skill": "", "subSkill": "", "qText": "", 
      "correctAnswer": "", "option1": "", "option2": "",
       "option3": "", "option4": ""
    }
    ]

    const categoryJson = [{
      "qName":"",	"level":"","noOfQuestions":"","questionsToBeSelected":""}
    ]
    const quizInfoJson = [
      {
        "quizName":"",
        	"noOfAttempts":"",
          	"duration":""
      }
    ]


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(questionJson);
  
    const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(categoryJson);

    const ws3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(quizInfoJson);
    

    XLSX.utils.book_append_sheet(wb, ws1, 'Questions');
    XLSX.utils.book_append_sheet(wb, ws2, 'Category');
    XLSX.utils.book_append_sheet(wb, ws3, 'QuizInfo');

    XLSX.writeFile(wb, fileName);
  }

  onClickView() {
    this.router.navigate(['view-question/', this.selectedTeam]);
  }

  getCollections() {
    this.viewTable = true;
    this.questionService.getCollections().subscribe((data) => {
      this.collectionNames = data;
    });
  }

  viewQuestion(n: any) {
    this.router.navigate(['view-question/', n]);
  }

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
  }

  logout() {
    this.authService.loggedOut();
  }
}
