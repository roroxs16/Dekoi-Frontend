import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('Inicio de sesion',`${this.authService.usuario.nombre} ya inicio sesion`,'info');
      this.router.navigate(['/'])
    }
  }

  login(): void {

    if (this.usuario.email == null || this.usuario.password == null) {
      swal.fire('Error al iniciar sesion', 'Usuario o contraseña vacia', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.router.navigate(['/']);
      swal.fire('Inicio de sesion exitoso', 'Ha ingresado exitosamente al sistema', 'success');
    },err =>{
      if(err.status == 400){
        swal.fire('Error al ingresar', 'Usuario o contraseña incorrecta', 'error');

      }
      if(err.status == 401){
        swal.fire('Error al ingresar', 'El usuario ingresado no es valido o no existe', 'error');

      }
    });
  }
}
