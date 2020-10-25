import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Categoria } from '../models/categoria';

import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/api/categoria';


  constructor(private http: HttpClient, private router: Router) { }

    public getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint);
    // return this.http.get(this.urlEndPoint).pipe(
    //   map((response) => response as Categoria[])
    // );
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria).pipe(
      map((response: any) => response.categoria as Categoria),
      catchError(e => {

        swal.fire('Error al crear la Categoria', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getCategoriaById(id): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(e.status!=401 ){
            this.router.navigate(['/productos']);
        }
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria)
      .pipe(
        map((response: any) => response.producto as Categoria),
        catchError(e => {

          swal.fire('Error al editar el producto', e.error.error, 'error');
          return throwError(e);
        })
      )
  }

}
