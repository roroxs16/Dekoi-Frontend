import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import { CarritoProducto } from '../models/carritoProducto';
import { ProductoForm } from '../models/productoForm';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndPoint: string = 'http://localhost:8080/api/carrito';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  addProductToCart(productoForm:ProductoForm):Observable<CarritoProducto>{
    return this.http.post<CarritoProducto>(`${this.urlEndPoint}/agregar/producto/`,productoForm, {headers:this.httpHeaders})
    .pipe(
      map((response: any) => response.carritoProducto as CarritoProducto),
      catchError(e => {
        if(e.status==401){
          swal.fire('Error al agregar un producto al carrito', 'Debe iniciar sesion', 'error')
        }else{
          swal.fire('Error al agregar un producto al carrito', e.error.mensaje, 'error')
        }

        return throwError(e);
      })
    )
  }

  removeProductoFromCart(id:number):Observable<CarritoProducto>{
    return this.http.delete<CarritoProducto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      map((response:any) => response.carritoProducto as CarritoProducto ),
      catchError(e  => {
        swal.fire('Error al remover el producto del carrito', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }


  listCarritoUsuario(): Observable<any> {
    return this.http.get(`${this.urlEndPoint}`).pipe(
      catchError(e => {

        swal.fire('Error al obtener el carrito', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
