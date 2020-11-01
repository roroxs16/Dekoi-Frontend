import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Usuario} from '../../models/usuario';
import {Compra} from '../../models/compra';
import {CarritoProducto} from '../../models/carritoProducto';
import { AuthService} from '../../service/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { ModalService } from '../../service/modal.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  faUser=faUser;
  usuario:Usuario = new Usuario();
  usuarioModal:Usuario;;
  compras:Compra[]=[]
  carritoProducto:CarritoProducto[];

  ultimaCompra :Compra =new Compra();
  constructor(private usuarioService: UsuarioService, public authService:AuthService,  private router: Router,     public modalService: ModalService,) { }

  ngOnInit(): void {
    this.usuarioService.cargarUsuario().subscribe(response=>{
      this.usuario=response;
      this.compras= this.usuario.compras;
      this.ultimaCompra=this.compras[this.compras.length-1];
      this.usuarioService.cargarProductosFromCompra(this.ultimaCompra.carrito.id).subscribe(response=>{

        this.carritoProducto=response;

      })
    });


  }

  abrirModal(usuario: Usuario) {

    this.usuarioModal = usuario

    this.modalService.abrirModal();
  }

  logout():void{
    let nombreUsuario=this.authService.usuario.nombre
    this.authService.logout();
    swal.fire('Cerrar sesión', ` ${nombreUsuario} ha cerrado sesion con exito`, 'success')
    this.router.navigate(['/']);
  }

}
