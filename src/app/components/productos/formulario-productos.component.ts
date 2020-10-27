import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

import {ProductoService} from '../../service/producto.service';
import {CategoriaService} from '../../service/categoria.service';

import { ActivatedRoute} from '@angular/router';


import {Router} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioProductosComponent implements OnInit {

  public producto: Producto = new Producto ();
  categorias: Categoria[];

  constructor(private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.categoriaService.getCategoria().subscribe(categorias =>
       this.categorias=categorias);
    this.cargarProducto();
  }

  public crearProducto(): void{

    this.productoService.createProducto(this.producto)
    .subscribe( producto => {
      this.router.navigate(['/productos'])
      swal.fire('Nuevo producto',` Producto ${producto.nombre} creado con exito!`,'success');
    }
    )
  }

  public cargarProducto():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.productoService.getProductoById(id).subscribe( (producto) => this.producto = producto);
      }
    })
  }


  public updateProducto(): void {
    this.productoService.updateProducto(this.producto)
    .subscribe( producto => {
      this.router.navigate(['/productos'])
      swal.fire('Producto Actualizado', `Producto ${producto.nombre} Actualizado con exito!`, 'success')
    })
  }

}
