import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private httpClient: HttpClient) { }

  getAllJavaQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allJava");
  }

  getAllMongoQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allMongo");
  }

  getAllHtmlQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allHtml");
  }

  getAllJavaBasicQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allJavaBasic");
  }

  getAllJavaInterQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allJavaIntermediate");
  }

  getAllJavaAdvanceQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allJavaAdvance");
  }

  getAllAngularQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8011/question/allAngular");
  }

  addQuestion(questions:any):Observable<any[]>{
    return this.httpClient.post<any[]>("http://localhost:8011/question/addQuestion", questions);
  }

  addResult(result: any):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8002/results/addResult',result)
  }

  getResult(name:string, qName: string, date: string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8002/results/getResult/${name}/${qName}/${date}`);
  }

  getResultByName(name: string, quiz: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8002/results/getResult/${name}/${quiz}`);
  }

  addCategory(category:any):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8003/category/addCategory',category);
  }

  getCategoryByqName(qName: string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8003/category/${qName}`);
  }

  getAllResults(){
    return this.httpClient.get<any>(`http://localhost:8002/results/`)
  }

  addQuizInfo(quizInfo: any){
    return this.httpClient.post<any>(`http://localhost:8004/quizinfo/addQuizInfo`, quizInfo)
  }

  getQuizInfo(quiz: string){
    return this.httpClient.get<any>(`http://localhost:8004/quizinfo/${quiz}`)
  }

  updateQuizInfo(quizInfo: any){
    return this.httpClient.put<any>(`http://localhost:8004/quizinfo/updateQuizInfo`, quizInfo)
  }

  updateResult(result: any){
    return this.httpClient.put<any>(`http://localhost:8002/results/updateResult`,result)
  }
}
