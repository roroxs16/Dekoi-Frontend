import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { Usuario } from '../models/usuario';
import { Compra } from '../models/compra';

import { CarritoProducto } from '../models/carritoProducto';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'

@Injectable({

  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuario/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }



  createUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {


        swal.fire('Error al crear el Usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  cargarUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlEndPoint, { headers: this.httpHeaders }).pipe(

      catchError(e => {


        swal.fire('Error al cargar el Usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  editUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlEndPoint}`, usuario, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        swal.fire('Error al editar el usuario', e.error.error, 'error');
        return throwError(e)
      })
    )
  }

  editDireccionUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('http://localhost:8080/api/usuariodireccion/', usuario, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        swal.fire('Error al editar el usuario', e.error.error, 'error');
        return throwError(e)
      })
    )
  }


  getAllCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.urlEndPoint + 'compras').pipe(
      catchError(e => {
        swal.fire('Error al obtener las compras', 'No se pudieron obtener las compras', 'error')
        return throwError(e);
      })
    )

  }
  getAllComprasAdmin(): Observable<Compra[]> {
    return this.http.get<Compra[]>("http://localhost:8080/api/compra/admin").pipe(
      catchError(e => {
        swal.fire('Error al obtener las compras', 'No se pudieron obtener las compras', 'error')
        return throwError(e);
      })
    )

  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(this.urlEndPoint + `compra/${id}`).pipe(
      catchError(e => {
        swal.fire('Error al obtener la compra', 'No se pudo obtener la compra', 'error')
        return throwError(e);
      })
    )
  }


  cargarProductosFromCompra(id: number): Observable<CarritoProducto[]> {
    return this.http.get<CarritoProducto[]>(`http://localhost:8080/api/carrito/productos?id=${id}`, { headers: this.httpHeaders }).pipe(

      catchError(e => {


        swal.fire('Error al cargar el carrito', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateCompra(compra: Compra): Observable<Compra>{
    return this.http.put<Compra>(`http://localhost:8080/api/compra/${compra.id}`, compra)
      .pipe(
        map((response: any) => response.compra as Compra),
        catchError(e => {

          swal.fire('Error al editar la Compra', e.error.error, 'error');
          return throwError(e);
        })
      )
  }

}
