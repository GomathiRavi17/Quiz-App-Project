import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private httpClient: HttpClient) { }

  getAllQuestions(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8001/questions/");
  }

  addQuestion(questions:any):Observable<any[]>{
    return this.httpClient.post<any[]>("http://localhost:8001/questions/addQuestion", questions);
  }

  addResult(result: any):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8002/results/addResult',result)
  }

  getResultByName(name:string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8002/results/getResult/${name}`);
  }

  addCategory(category:any):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8003/category/addCategory',category);
  }

  getCategoryByqName(qName: string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8003/category/${qName}`);
  }
}
