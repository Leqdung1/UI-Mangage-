import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPeople, PeopleList } from './interface/people';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7259";

  constructor(private http: HttpClient) { }

  getAllPeople(offset: number, pageSize: number, currentPage: number): Observable<PeopleList> {
    const apiUrl = `${this.apiUrl}/api/Manage?offset=${offset}&pageSize=${pageSize}&pageNumber=${currentPage}`;   
    return this.http.get<PeopleList>(apiUrl);
  }

  createPeople(people: IPeople): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Manage`, people);
  }

  getPeople(peopleId: number): Observable<IPeople> {
    return this.http.get<IPeople>(`${this.apiUrl}/api/Manage/${peopleId}`);
  }

  updatePeople(peopleId: number, people: IPeople): Observable<IPeople> {
    return this.http.put<IPeople>(`${this.apiUrl}/api/Manage/${peopleId}`, people);
  }

  deleteByPeopleId(peopleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Manage/${peopleId}`);
  }

  deleteByIds(ids: number[]): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Manage/multiple`, { body: ids });
  }

  deleteAllPeople(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Manage/all`);
  }
}
