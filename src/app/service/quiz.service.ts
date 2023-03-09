import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private httpClient: HttpClient) { }

  getAllJavaQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allJava");
  }

  getAllMongoQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allMongo");
  }

  getAllHtmlQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allHtml");
  }

  getAllJavaBasicQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allJavaBasic");
  }

  getAllJavaInterQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allJavaIntermediate");
  }

  getAllJavaAdvanceQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/question/allJavaAdvance");
  }

  addQuestion(questions:any):Observable<any[]>{
    return this.httpClient.post<any[]>("http://localhost:8001/question/addQuestion", questions);
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
}
