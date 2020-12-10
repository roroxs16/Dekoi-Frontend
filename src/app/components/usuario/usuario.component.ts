import { Component, OnInit } from '@angular/core';

import { faUser,faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {Usuario} from '../../models/usuario';
import {Compra} from '../../models/compra';
import {CarritoProducto} from '../../models/carritoProducto';

import swal from 'sweetalert2';

import {Router} from '@angular/router';
import { AuthService} from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { ModalService } from '../../service/modal.service';
import { Carrito } from 'src/app/models/carrito';
import {URL_BACKEND} from '../../config/config';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  urlBackend= URL_BACKEND;

  faUser=faUser;
  usuario:Usuario = new Usuario();
  usuarioModal:Usuario=new Usuario;
  usuarioDireccionModal:Usuario;
  compras:Compra[]=[]
  carritoProducto:CarritoProducto[]= null;
  ultimaCompra :Compra = null;
  carrito: Carrito = null;
  esCompras:boolean=false;
  allCompras: Compra[]=[];
  faPowerOff=faPowerOff

  constructor(private usuarioService: UsuarioService, 
              public authService:AuthService, 
              private router: Router, 
              public modalService: ModalService
            ) { }

  ngOnInit(): void {
    this.usuarioService.cargarUsuario().subscribe(response=>{
      this.usuario=response;
      this.compras= this.usuario.compras;
      this.ultimaCompra=this.compras[this.compras.length-1];
      this.carrito = this.ultimaCompra.carrito;
      this.usuarioService.cargarProductosFromCompra(this.carrito.id).subscribe(response=>{

        this.carritoProducto=response;
        
      })
    });


  }

  abrirModal(usuario: Usuario) {

    this.usuarioModal = usuario

    this.modalService.abrirModal();
  }
  cerrarModal() {
    this.modalService.cerrarModal();
  }

  abrirModalDireccion(usuario: Usuario) {

    this.usuarioDireccionModal = usuario;
    this.modalService.abrirModal();
  }


  logout():void{
    let nombreUsuario=this.authService.usuario.nombre
    this.authService.logout();
    swal.fire('Cerrar sesión', ` ${nombreUsuario} ha cerrado sesion con exito`, 'success')
    this.router.navigate(['/']);
  }

  loadUltimaCompra():void{
    this.esCompras=false;
    this.ultimaCompra=this.compras[this.compras.length-1];

  }

  loadMisCompras():void{
    this.esCompras=true;
    this.ultimaCompra=new Compra();
    this.usuarioService.getAllCompras().subscribe(response =>{
      this.compras=response;
    });
  }

  loadAllCompras():void{
    this.usuarioService.getAllComprasAdmin().subscribe(response =>{
      this.compras=response;
    })
  }
}
