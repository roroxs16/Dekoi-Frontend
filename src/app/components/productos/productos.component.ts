import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductoService } from '../../service/producto.service';
import { CarritoService } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { CategoriaService } from '../../service/categoria.service';
import { ProductoForm } from '../../models/productoForm';
import {URL_BACKEND} from '../../config/config';

import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[]=[];

  categorias: Categoria[];

  producto: Producto = new Producto();

  paginador: any;

  urlBackend= URL_BACKEND;

  enabled: boolean = false;
  productoForm:ProductoForm = new ProductoForm();

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private carritoService:CarritoService,
    public authService: AuthService) { }

  ngOnInit(): void {

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

  public addProductToCart(id: number):any{

    this.productoForm.cantidad=1;
    this.productoForm.productoId=id;
    this.carritoService.addProductToCart(this.productoForm).subscribe(
      response =>{
        swal.fire('Producto agregado',` Producto Agregado con exito al carrito`,'success');
      }
    );
  }

}
