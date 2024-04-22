import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPeople } from './interface/people';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7259";
  constructor(private http: HttpClient) { }

  getAllPeople() {
    return this.http.get<IPeople[]>(`${this.apiUrl}/api/Manage`);
  }
    
  createPeople(people: IPeople) {
    return this.http.post(`${this.apiUrl}/api/Manage`, people);
  }

  getPeople(peopleId: number) {
    return this.http.get<IPeople>(`${this.apiUrl}/api/Manage/${peopleId}`);
  }

  updatePeople(peopleId: number, employee: IPeople) {
    return this.http.put<IPeople>(`${this.apiUrl}/api/Manage/${peopleId}`, employee);
  }

  deleteByPeopleId(peopleId: number) {
    return this.http.delete(`${this.apiUrl}/api/Manage/${peopleId}`);
  }

  deleteByIds() {
    return this.http.delete(`https://localhost:7259/api/Manage/multiple`)
  }

  deletePeople(){
    return this.http.delete(`https://localhost:7259/api/Manage/all`);
  }
  
}
