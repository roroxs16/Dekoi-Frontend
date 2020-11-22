import { Injectable } from '@angular/core';
import { HttpClient,  HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import {Servicio} from '../models/servicio';

import { Observable,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private urlEndPoint: string ='http://localhost:8080/api/servicio';

  constructor(private http: HttpClient, private router: Router) { }

  public getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlEndPoint).pipe(
      catchError(e =>{
        swal.fire('Error al cargar los servicios', 'No se pudo cargar los servicios', 'error');
        return throwError(e);
      })
    );
  }

}
