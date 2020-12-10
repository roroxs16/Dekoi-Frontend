import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { UsuarioService } from '../../service/usuario.service';
import {Usuario} from '../../models/usuario';

import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {URL_BACKEND} from '../../config/config';


@Component({
  selector: 'app-usuariodireccion',
  templateUrl: './usuariodireccion.component.html',
  styleUrls: ['./usuariodireccion.component.css']
})
export class UsuariodireccionComponent implements OnInit {

  @Input() usuarioDireccionModal: Usuario;

  urlBackend= URL_BACKEND;


  constructor(private usuarioService: UsuarioService,public modalService: ModalService, private router: Router) { }


  ngOnInit(): void {
  }

    cerrarModal() {
      this.modalService.cerrarModal();
    }


    editarCuenta():void{
      this.usuarioService.editDireccionUser(this.usuarioDireccionModal).subscribe( usuario => {
            this.router.navigate(['/usuario'])
            swal.fire('Cuenta Actualizada', `Cuenta actualizada con exito!`, 'success')
          });
    }
}
