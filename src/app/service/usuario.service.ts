import { Injectable } from '@angular/core';
import { HttpClient,  HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { Usuario } from '../models/usuario';

import { CarritoProducto } from '../models/carritoProducto';
import { Observable,  throwError } from 'rxjs';
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
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {


        swal.fire('Error al crear el Usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  cargarUsuario(): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlEndPoint, {headers: this.httpHeaders}).pipe(

      catchError(e => {


        swal.fire('Error al cargar el Usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  editUser(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}`,usuario, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.usuario as Usuario),
      catchError(e=>{
        swal.fire('Error al editar el usuario', e.error.error, 'error');
        return throwError(e)
      })
    )
  }




  cargarProductosFromCompra(id:number): Observable<CarritoProducto[]>{
    return this.http.get<CarritoProducto[]>(`http://localhost:8080/api/carrito/productos?id=${id}`, {headers: this.httpHeaders}).pipe(

      catchError(e => {


        swal.fire('Error al cargar el carrito', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

}
