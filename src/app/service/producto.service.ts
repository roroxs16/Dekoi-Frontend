import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import { Producto } from '../models/producto';
import { Imagen } from '../models/imagen';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/api/producto';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private router: Router) { }

  getProducto(page:number): Observable<any> {
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response: any) => {
        (response.content as Producto[]).map(producto =>{
          return producto;
        });
        return response;
      })
    );

  }

  getProductoById(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/productos']);
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.producto as Producto),
      catchError(e => {
        swal.fire('Error al crear el producto', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`, producto, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError(e => {
          swal.fire('Error al editar el producto', e.error.error, 'error');
          return throwError(e);
        })
      )
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError(e => {
          swal.fire('Error al eliminar el producto', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/img/`,formData, {
      reportProgress: true
    })


    return this.http.request(req);
  }
}
