import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPeople } from './interface/people';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7259";
  constructor(private http: HttpClient) { }

  getAllPeople(offset: number, pageSize: number): Observable<IPeople[]> {
    const apiUrl = `${this.apiUrl}/api/Manage?offset=${offset}&pageSize=${pageSize}`;
    return this.http.get<IPeople[]>(apiUrl);
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

  deleteByIds(ids: number[]) {
  return this.http.delete(`https://localhost:7259/api/Manage/multiple`, { body: ids });
  }

  deletePeople(){
    return this.http.delete(`https://localhost:7259/api/Manage/all`);
  }
  
}
