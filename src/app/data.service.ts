import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'assets/data.json';
  //regions$ = this.http.get<Region[]>(this.url);


  getData(): Observable<any> {
    return this.http.get(this.url);
  }
  constructor(private http: HttpClient) {
  }
}
