import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
 
 

  constructor(private httpClient: HttpClient) { }

  getAllQuestions(url:string): Observable<any>{
    return this.httpClient.get<any>(url);
  }
}
