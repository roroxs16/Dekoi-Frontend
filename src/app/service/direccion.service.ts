import { Injectable } from '@angular/core';
import { Direccion } from '../models/direccion';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
//produccion
  private urlEndPoint: string = URL_BACKEND+'/api/direccion';

    //private urlEndPoint: string = 'http://localhost:8080/api/direccion';

  constructor(private http: HttpClient, private router: Router) { }

  createDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(this.urlEndPoint, direccion).pipe(
      map((response: any) => response.direccion as Direccion),
      catchError(e => {

        swal.fire('Error al crear la Direccion de envio', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
}
