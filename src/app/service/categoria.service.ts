import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Categoria } from '../models/categoria';



import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



import swal from 'sweetalert2'


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

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.categoria as Categoria),
      catchError(e => {
        swal.fire('Error al crear la Categoria', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

}
