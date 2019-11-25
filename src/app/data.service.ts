import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'assets/data.json';

  getData$ = this.http.get<any[]>(this.url);

  constructor(private http: HttpClient) {
  }
}
