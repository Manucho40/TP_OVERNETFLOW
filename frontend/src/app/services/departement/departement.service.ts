import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartementVO } from '../../model/Departement';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  readonly url = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {}

  public getDepartements(): Observable<DepartementVO[]> {
    return this.http.get<DepartementVO[]>(this.url + 'departements');
  }
}
