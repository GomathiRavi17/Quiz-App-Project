import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { }

  // getAll(selectedTeam:string){
  //   if(selectedTeam=='Java'){
  //     return this.http.get("http://localhost:5453/question/allJava");
  //   }
  //   else if(selectedTeam=='Mongodb'){
  //     return this.http.get("http://localhost:5453/question/allMongo");
  //   }
  //   else if(selectedTeam=='Html'){
  //     return this.http.get("http://localhost:5453/question/allHtml");
  //   }
  //   else{
  //     return this.http.get("http://localhost:5453/question/all");
  //   }
  // }
  
  getAll(){
    return this.http.get("http://localhost:8011/question/all");
  }
  getAllJava(){
    return this.http.get("http://localhost:8011/question/allJava");
  }
  getAllMongo(){
    return this.http.get("http://localhost:8011/question/allMongo");
  }
  deleteMongo(id:number){
    return this.http.delete("http://localhost:8011/question/deleteMongo/"+id,{responseType:"text"})
  }
  getAllHtml(){
    return this.http.get("http://localhost:8011/question/allHtml");
  }
  deleteHtml(id:number){
    return this.http.delete("http://localhost:8011/question/deleteHtml/"+id,{responseType:"text"})
  }

  getById(id:number){
    return this.http.get("http://localhost:8011/question/java/"+id);
  }

  updateJava(java:[]){
    return this.http.put("http://localhost:8011/question/update",java);
  }

  deleteJava(id:number){
    return this.http.delete("http://localhost:8011/question/delete/"+id ,{responseType:"text"})
  }

  getCollections(){
    return this.http.get("http://localhost:8011/question/getLists");
  }
// ===========================================================================================================================================
  getAllJavaBasic(){
    return this.http.get("http://localhost:8011/question/allJavaBasic");
  }

  getByIdBasic(id:number){
    return this.http.get("http://localhost:8011/question/javaBasic/"+id);
  }

  updateJavaBasic(java:[]){
    return this.http.put("http://localhost:8011/question/updateBasic",java);
  }

  deleteJavaBasic(id:number){
    return this.http.delete("http://localhost:8011/question/deleteBasic/"+id,{responseType:"text"})
  }
// ===========================================================================================================================================

  getAllJavaIntermediate(){
    return this.http.get("http://localhost:8011/question/allJavaIntermediate");
  }

  getByIdIntermediate(id:number){
    return this.http.get("http://localhost:8011/question/javaIntermediate/"+id);
  }

  updateJavaIntermediate(java:[]){
    return this.http.put("http://localhost:8011/question/updateIntermediate",java);
  }

  deleteJavaIntermediate(id:number){
    return this.http.delete("http://localhost:8011/question/deleteIntermediate/"+id,{responseType:"text"})
  }
// ===========================================================================================================================================

getAllJavaAdvance(){
  return this.http.get("http://localhost:8011/question/allJavaAdvance");
}

getByIdAdvance(id:number){
  return this.http.get("http://localhost:8011/question/javaAdvance/"+id);
}

updateJavaAdvance(java:[]){
  return this.http.put("http://localhost:8011/question/updateAdvance",java);
}

deleteJavaAdvance(id:number){
  return this.http.delete("http://localhost:8011/question/deleteAdvance/"+id,{responseType:"text"})
}

getAllAngularQuestions(): Observable<any>{
  return this.http.get<any>("http://localhost:8011/question/allAngular");
}


}
