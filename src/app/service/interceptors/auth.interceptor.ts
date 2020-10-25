import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import swal from 'sweetalert2'
import {AuthService} from '../auth.service';
import { Observable,throwError } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e=> {
        if (e.status == 401) {
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login'])

        }

        if (e.status == 403) {
          this.router.navigate(['/productos'])

        }
        return throwError(e);
      })
    );
  }
}
