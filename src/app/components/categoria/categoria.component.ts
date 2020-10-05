import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';

import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  productosPorCategoria: Producto[];
  enabled:boolean=false;
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    //  this.categoria = this.categoriaService.getCategoria();
    this.categoriaService.getCategoria().subscribe(response => {
      this.categorias = response;
    });

  }

  public mostrarProductos(categoria: Categoria):any{
    this.productosPorCategoria=[];
    this.productosPorCategoria=categoria.productos;
    this.enabled=true;
    
  }

}
