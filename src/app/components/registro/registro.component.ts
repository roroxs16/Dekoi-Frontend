import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../service/usuario.service';

import { ActivatedRoute} from '@angular/router';

import {Usuario} from '../../models/usuario';

import {Router} from '@angular/router';
import swal from 'sweetalert2';

import {clean,validate,format} from 'rut.js';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario= new Usuario();
  public confirmPassword:string = "";
  constructor(private usuarioService:UsuarioService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

  }

  validarRut(rut:string):boolean{
    rut=clean(rut);
    rut=format(rut);
    if(validate(rut)){

      return true;

    }

    return false;

  }

  validarPassword(pass:string):boolean{
    if(pass==this.confirmPassword){

      return true;
    }

    return false;
  }

  formateRut(rut:string):string{
    rut=clean(rut)
    return format(rut);
  }

  public crearUsuario():void{
  
    this.usuarioService.createUser(this.usuario).subscribe( usuario => {
      this.router.navigate(['/login'])
      swal.fire('Nuevo Usuario',` Usuario ${usuario.nombre} creado con exito!`,'success');
    }
    )
  }
}
