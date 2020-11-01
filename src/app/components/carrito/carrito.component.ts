import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { CompraService } from '../../service/compra.service';
import { CarritoProducto } from '../../models/carritoProducto';
import { Direccion } from '../../models/direccion';
import { faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoProductos: CarritoProducto[] = [];
  faLeft = faChevronLeft;
  faRight = faChevronRight;
  faTrash = faTrash;
  valorCarrito: number;
  public direccion: Direccion = new Direccion();

  constructor(private carritoService: CarritoService, private compraService: CompraService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }


  cargarCarrito(): void {
    this.carritoService.listCarritoUsuario().subscribe((response) => {

      this.carritoProductos = response;
      this.valorCarrito = this.carritoProductos[0].carrito.valor;

    })
  }
  realizarCompra(): void {
    this.compraService.generateCompra(this.direccion).subscribe((response) => {
      swal.fire('Se genero la compra', 'La compra se realizó exisotsamente!', 'success')
    })
  }

  carritoVacio(): boolean {
    if(this.carritoProductos==[]){

      return true;
    }
    return false
  }


  removeProductoFormCart(carritoProducto: CarritoProducto): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "¿Seguro que desea elimninar el producto del carrito?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimninar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.carritoService.removeProductoFromCart(carritoProducto.id).subscribe(
          response => {
            this.carritoProductos = this.carritoProductos.filter(carr => carr !== carritoProducto)
            swalWithBootstrapButtons.fire(
              'Producto eliminado!',
              'Producto Eliminado con exito!',
              'success'
            )
          }
        )


      }
    })
  }


}
