import { Injectable } from '@angular/core';
import { HttpClient,  HttpRequest, HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';

import {Servicio} from '../models/servicio';

import { Observable,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

    
  private urlEndPoint: string =URL_BACKEND+'/api/servicio';

 // private urlEndPoint: string ='http://localhost:8080/api/servicio';

  constructor(private http: HttpClient, private router: Router) { }

  public getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlEndPoint).pipe(
      catchError(e =>{
        swal.fire('Error al cargar los servicios', 'No se pudo cargar los servicios', 'error');
        return throwError(e);
      })
    );
  }

  deleteServicio(id:number): Observable<Servicio>{
    return this.http.delete<Servicio>(`${this.urlEndPoint}/${id}`)
    .pipe(
      map((response:any)=> response.servicio as Servicio),
      catchError(e=>{
        swal.fire('Error al eliminar el producto', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  createServicio(servicio:Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(this.urlEndPoint, servicio).pipe(
      map((response: any) => response.servicio as Servicio),
      catchError(e => {


        swal.fire('Error al crear el servicio', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getServicioById(id): Observable<Servicio>{
    return this.http.get<Servicio>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
    
        swal.fire('Error al obtener', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateServicio(servicio:Servicio):Observable<Servicio>{
    return this.http.put<Servicio>(`${this.urlEndPoint}/${servicio.id}`, servicio)
    .pipe(
      map((response: any) => response.producto as Servicio),
      catchError(e => {

        swal.fire('Error al editar el servicio', e.error.error, 'error');
        return throwError(e);
      })
    )
  }

}
