import { Injectable } from '@angular/core';

//Imports HTTP
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://127.0.0.1:3333";

  constructor(private http: HttpClient) { 

  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/pokemon`)
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}/pokemon/${id}`)
  }

  create(item: any): Observable<any> {
    return this.http.post(`${this.url}/pokemon`, item)
  }

  update(item: any): Observable<any> {
    return this.http.put(`${this.url}/pokemon/${item.id}`, item)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/pokemon/${id}`)
  }
}