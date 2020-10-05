import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Categoria } from '../models/categoria';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/api/categoria';
   private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

    public getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint);
    // return this.http.get(this.urlEndPoint).pipe(
    //   map((response) => response as Categoria[])
    // );
  }
}
