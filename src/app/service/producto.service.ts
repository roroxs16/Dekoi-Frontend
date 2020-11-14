import { Injectable } from '@angular/core';
import { HttpClient,  HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import { Producto } from '../models/producto';


import { Observable,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/api/producto';



  constructor(private http: HttpClient, private router: Router) { }
  //
  // private agregarAuthorizationHeader() {
  //   let token = this.authService.token;
  //
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   return this.httpHeaders;
  // }

  getProducto(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
          return producto;
        });
        return response;
      })
    );

  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint).pipe(
      catchError(e=>{
        swal.fire('Error al obtener las compras', 'No se pudieron obtener las compras', 'error')
        return throwError(e);
      })
    );

  }

  getProductoById(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
    
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto).pipe(
      map((response: any) => response.producto as Producto),
      catchError(e => {


        swal.fire('Error al crear el producto', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`, producto)
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError(e => {

          swal.fire('Error al editar el producto', e.error.error, 'error');
          return throwError(e);
        })
      )
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`)
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError(e => {


          swal.fire('Error al eliminar el producto', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);



    const req = new HttpRequest('POST', `${this.urlEndPoint}/img/`, formData, {
      reportProgress: true,

    })


    return this.http.request(req);
  }
}
