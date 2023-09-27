import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL: string = 'http://localhost:3000/enquiry'

  constructor(private http: HttpClient) {
  }

  postRegistration(registerObj:User){
    return this.http.post<User>(`${this.baseURL}`,registerObj)
  }

  getRegisteredUser(){
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  updateRegisteredUser(registerObj:User,id:number){
    return this.http.put<User>(`${this.baseURL}/${id}`,registerObj)
  }

  deleteRegisteredUser(id:number){
    return this.http.delete<User>(`${this.baseURL}/${id}`)
  }

  getRegisteredUserById(id:number){
    return this.http.get<User>(`${this.baseURL}/${id}`)
  }
}
