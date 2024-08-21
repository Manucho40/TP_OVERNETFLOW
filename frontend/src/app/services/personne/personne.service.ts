import { Injectable } from '@angular/core';
import { PersonneVO } from '../../model/Personne';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  readonly url = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {}

  public getPersonnes(): Observable<PersonneVO[]> {
    return this.http.get<PersonneVO[]>(this.url + 'personnes');
  }

  public addPersonne(personne: PersonneVO): Observable<PersonneVO> {
    return this.http.post<PersonneVO>(this.url + 'personne', personne);
  }

  public deletePersonne(id: number): Observable<String> {
    return this.http.delete<string>(this.url + `personne/${id}`);
  }

  public updatPersonne(id: number, personne: PersonneVO) {
    return this.http.put<PersonneVO>(this.url + `personne/${id}`, personne);
  }
}
