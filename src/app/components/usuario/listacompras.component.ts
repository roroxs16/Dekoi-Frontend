import {
  Component,
  OnInit
} from '@angular/core';

import {
  faUser,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import {
  Usuario
} from '../../models/usuario';
import {
  Compra
} from '../../models/compra';
import {
  CarritoProducto
} from '../../models/carritoProducto';

import swal from 'sweetalert2';

import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../service/auth.service';
import {
  UsuarioService
} from '../../service/usuario.service';
import {
  ModalService
} from '../../service/modal.service';
import {
  Carrito
} from 'src/app/models/carrito';
import {
  URL_BACKEND
} from '../../config/config';

@Component({
  selector: 'app-listacompras',
  templateUrl: './listacompras.component.html',
  styleUrls: ['./listacompras.component.css']
})
export class ListacomprasComponent implements OnInit {
  urlBackend = URL_BACKEND;

  faUser = faUser;
  usuario: Usuario = new Usuario();
  usuarioModal: Usuario = new Usuario;
  usuarioDireccionModal: Usuario;
  compras: Compra[] = []
  carritoProducto: CarritoProducto[] = [];
  ultimaCompra: Compra = null;
  carrito: Carrito[] = [];
  esCompras: boolean = false;
  allCompras: Compra[] = [];
  comprasConProductos: Compra[] = [];
  faPowerOff = faPowerOff
  dict = new Object();
  constructor(private usuarioService: UsuarioService,
    public authService: AuthService,
    private router: Router,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {

    this.cargarUsuario();
    this.loadMisCompras();
   
  }

  public cargarUsuario(): void {

    this.usuarioService.cargarUsuario().subscribe(response => {
      this.usuario = response;
      this.compras = response.compras;

    

     
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


  logout(): void {
    let nombreUsuario = this.authService.usuario.nombre
    this.authService.logout();
    swal.fire('Cerrar sesión', ` ${nombreUsuario} ha cerrado sesion con exito`, 'success')
    this.router.navigate(['/']);
  }


  loadMisCompras(): void {

    this.usuarioService.getAllCompras().subscribe(response => {
      this.compras = response;
      this.compras.forEach(compra=>{
        this.loadMisProductos(compra.carrito.id,compra);
        this.carrito.push(compra.carrito)

      })

    });
   
  }

  loadMisProductos(id: number, compra:Compra):void{
    this.usuarioService.cargarProductosFromCompra(id).subscribe(response => {

      compra.carrito.carritoProducto=response;

      this.comprasConProductos.push(compra)
    })
  }





}
