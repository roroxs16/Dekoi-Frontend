import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { UsuarioService } from '../../service/usuario.service';
import {Usuario} from '../../models/usuario';
import {clean,validate,format} from 'rut.js';

import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent implements OnInit {
  public confirmPassword:string = "";
  @Input() usuarioModal: Usuario;

  constructor(private usuarioService: UsuarioService,public modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalService.cerrarModal();
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

  editarCuenta():void{
    this.usuarioService.editUser(this.usuarioModal).subscribe( usuario => {
          this.router.navigate(['/usuario'])
          swal.fire('Cuenta Actualizada', `Cuenta actualizada con exito!`, 'success')
        });
  }

}
