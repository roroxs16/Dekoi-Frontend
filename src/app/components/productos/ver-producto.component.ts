import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/producto';
import { Imagen } from '../../models/imagen';

import {Router, ActivatedRoute} from '@angular/router';

import { ProductoService } from '../../service/producto.service';
import { ModalService } from '../../service/modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  producto: Producto = new Producto();
  productoId: number;
  imagen: Imagen = new Imagen();
  productos:Producto[];

  constructor(private productoService: ProductoService,
              private activatedRoute:ActivatedRoute,
              private modalService: ModalService,
              private router: Router,) { }

  ngOnInit(): void {
    this.cargarProducto();

  }

  cargarProducto():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.productoId= id;
      if(id){
        this.productoService.getProductoById(id)
        .subscribe( (producto) => { console.log(producto)
        this.producto = producto});
      }
    })
  }

  abrirModal(id:number){

    this.productoId=id;
    this.modalService.abrirModal();
  }
  delete(producto: Producto): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "¿Seguro que desea elimninar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimninar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.deleteProducto(producto.id).subscribe(
          response => {

            swalWithBootstrapButtons.fire(
              'Producto eliminado!',
              'Producto Eliminado con exito!',
              'success'
            )
            this.router.navigate(['/productos'])
          }
        )


      }
    })
  }

}
