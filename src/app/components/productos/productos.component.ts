import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/producto';
import { ProductoCompra } from '../../models/productoCompra';
import { ProductoCompras } from '../../models/productoCompras';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';

import {Subscription} from "rxjs/internal/Subscription";

import { ProductoService } from '../../service/producto.service';
import { CategoriaService } from '../../service/categoria.service';
import { CompraService } from '../../service/compra.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];

  categorias: Categoria[];

  producto: Producto = new Producto();

  paginador: any;

  productoCompra: ProductoCompra[]=[];

  selectedproductoCompra: ProductoCompra;

  private carritoDeCompras: ProductoCompras;

  sub: Subscription;

  productoSelected: boolean = false;

  enabled: boolean = false;

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private compraService:CompraService) { }

  ngOnInit(): void {
    this.productoCompra=[];

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.categoriaService.getCategoria().subscribe(response => {
        this.categorias = response;
      });

      this.productoService.getProducto(page).subscribe(response => {
        this.productos = response.content as Producto[];
        this.paginador = response;
      });
    })

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
            this.productos = this.productos.filter(pro => pro !== producto)
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

  public mostrarProductos(categoria: Categoria): any {
    this.productos = [];
    this.productos = categoria.productos;
    this.enabled = true;

  }

  agregarAlCarrito(compra: ProductoCompra){
    this.compraService.SelectedProductoCompra = compra;
    this.selectedproductoCompra = this.compraService.SelectedProductoCompra;
    this.productoSelected= true;
  }
  

}
