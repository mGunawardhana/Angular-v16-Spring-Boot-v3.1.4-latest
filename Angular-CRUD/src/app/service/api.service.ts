import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL: string = 'http://localhost:8080/user'

  constructor(private http: HttpClient) {
  }

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseURL + '/save'}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseURL + '/get-all-users'}`)
  }

  updateRegisteredUser(registerObj: User) {
    return this.http.put<User>(`${this.baseURL + '/update'}`, registerObj)
  }


  deleteRegisteredUser(id: number) {
    return this.http.delete<User>(`${this.baseURL + '/delete'}/${id}`)
  }

  getRegisteredUserById(id: number) {
    return this.http.get<User>(`${this.baseURL + '/find-by-id'}/${id}`)
  }
}
