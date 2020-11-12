import { Injectable } from '@angular/core';
import { Compra } from '../models/compra';
import { Direccion } from '../models/direccion';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private urlEndPoint: string = 'http://localhost:8080/api/compra';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  generateCompra(direccion: Direccion): Observable<Compra>{
    return this.http.post<Compra>(`${this.urlEndPoint}`, direccion,{headers: this.httpHeaders})
      .pipe(
        map((response:any)=> response.compra as Compra),
        catchError(e=> {
          swal.fire(`Error al generar la compra`, e.error.mensaje, 'error')
          return throwError(e);
        })
      )
  }

  
}
