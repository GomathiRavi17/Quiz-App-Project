import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from './AuthRequest';
import { User } from './signup/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8000/auth/register`,user);
  }

  login(user: AuthRequest): Observable<any>{
     return this.httpClient.post<any>(`http://localhost:8000/auth/login`, user);
  }

  getUserRole(username: string): Observable<any>{
    return this.httpClient.get<string>(`http://localhost:8000/auth/getRole/${username}`)
  }

  storeToken(token: string){
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token=='' || token == null){
      return false;
    }
    else{
      return true;
    }
  }

  loggedOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("startTime");
    location.reload();
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
