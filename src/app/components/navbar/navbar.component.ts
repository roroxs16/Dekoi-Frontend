import { Component, OnInit } from '@angular/core';
import {AuthService} from'../../service/auth.service'
import swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(public authService:AuthService, private router: Router) { }

  ngOnInit(): void {

  }
nombreLogueado:string=this.authService.usuario.nombre
  logout():void{
    let nombreUsuario=this.authService.usuario.nombre
    this.authService.logout();
    swal.fire('Cerrar sesión', ` ${nombreUsuario} ha cerrado sesion con exito`, 'success')
    this.router.navigate(['/']);
  }

}
