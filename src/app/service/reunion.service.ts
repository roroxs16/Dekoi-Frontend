import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  Reunion
} from '../models/reunion';

import {
  Observable,
  throwError
} from 'rxjs';
import {
  map,
  catchError
} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  private urlEndPoint: string = 'http://localhost:8080/api/reunion';

  constructor(private http: HttpClient, private router: Router) {}

  public getReuniones(): Observable < Reunion[] > {
    return this.http.get < Reunion[] > (this.urlEndPoint).pipe(
      catchError(e => {
        swal.fire('Error al cargar las reuniones', 'No se pudo cargar las reuniones', 'error');
        return throwError(e);
      })
    );
  }
  public agregarReuniones(fechaInicio: string, fechaFin: string, id: number) {


    return this.http.post(this.urlEndPoint + `/${id}/?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, null).pipe(
      map((response: any) => response.reunion as Reunion),
      catchError(e => {


        swal.fire('Error al crear la Reunion', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  public editarReunion(urlLink: string, id:number){
    console.log(urlLink, id)
    return this.http.put(this.urlEndPoint + `/${id}/?linkReunion=${urlLink}`, null).pipe(
      map((response: any) => response.reunion as Reunion),
      catchError(e => {


        swal.fire('Error al modificar la Reunion', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
}
