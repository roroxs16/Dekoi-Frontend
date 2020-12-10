import { Component, OnInit,Input } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import {Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { Compra } from '../../models/compra';
import { Carrito } from 'src/app/models/carrito';
import { Direccion } from 'src/app/models/direccion';
import {URL_BACKEND} from '../../config/config';

import { CarritoProducto } from 'src/app/models/carritoProducto';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {

  urlBackend= URL_BACKEND;


  compra: Compra = new Compra();
  carrito: Carrito = new Carrito();
  direccion: Direccion = new Direccion();
  usuarioNombre: string;
  usuarioTelefono: string;
  usuarioApellido: string;
  usuarioEmail: string;
  carritoProducto:CarritoProducto[]= null;
  constructor(private usuarioService: UsuarioService, 
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargaCompra();

    
    this.activatedRoute.queryParamMap.subscribe(params =>{
      this.usuarioNombre = params.get('usuarioNombre')
      this.usuarioApellido = params.get('usuarioApellido')
      this.usuarioTelefono = params.get('usuarioNumero')
      this.usuarioEmail = params.get('usuarioEmail')      
    })
  }


  cargaCompra():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.usuarioService.getCompra(id).subscribe( (compra) => {
          this.compra = compra
        
          this.carrito = compra.carrito;
          this.direccion = compra.direccion;
          this.usuarioService.cargarProductosFromCompra(compra.carrito.id).subscribe(response=>{
            this.carritoProducto=response
          })
          this.usuarioService.cargarUsuario()
        }
        );
        
      }
    })
  }

  updateCompra():void{
    this.usuarioService.updateCompra(this.compra).subscribe( compra =>{
      this.router.navigate(['/usuario'])
      swal.fire('Compra Actualizada', `Compra ${compra.id} Actualizado con exito!`, 'success')
    })
  }

}
