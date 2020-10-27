import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import { Carrito } from '../models/carrito';
import { Compra } from '../models/compra';
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

  createCarrito(): Observable<Carrito>{
    return this.http.post<Carrito>(`${this.urlEndPoint}/crear`,{headers:this.httpHeaders}).pipe(
      map((response: any) => response.carrito as Carrito),
      catchError(e => {
        swal.fire('Error al crear el carrito', e.error.mensaje, 'error')
        return throwError(e)
      })
    )
  }

  addProductToCart(productoForm:ProductoForm ,id:number ):Observable<CarritoProducto>{
    return this.http.post<CarritoProducto>(`${this.urlEndPoint}/agregar/producto/${id}`,productoForm, {headers:this.httpHeaders})
    .pipe(
      map((response: any) => response.carritoProducto as CarritoProducto),
      catchError(e => {
        swal.fire('Error al agregar un producto al carrito', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  removeProductoFromCart(id:number):Observable<CarritoProducto>{
    return this.http.delete<CarritoProducto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      map((response:any) => response.carritoProducto as CarritoProducto),
      catchError(e  => {
        swal.fire('Error al remover el producto del carrito', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
  generateCompra(id:number): Observable<Compra>{
    return this.http.post<Compra>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      .pipe(
        map((response:any)=> response.compra as Compra),
        catchError(e=> {
          swal.fire(`Error al generar la compra`, e.error.mensaje, 'error')
          return throwError(e);
        })
      )
  }
}
