import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../models/categoria';

import { CategoriaService } from '../../service/categoria.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();
  enabled: boolean = false;
  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //  this.categoria = this.categoriaService.getCategoria();


  }

  public crearCategoria(): void {
    this.categoriaService.createCategoria(this.categoria).
      subscribe(categoria => {
        this.router.navigate(['/productos'])
        swal.fire('Nueva categoria', `Categoria ${categoria.nombre} creada con existo!`, 'success')
      })
  }

}
