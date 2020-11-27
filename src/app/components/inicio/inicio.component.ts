import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { CarritoService } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { CategoriaService } from '../../service/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { faChevronLeft, faChevronRight, faTools, faChair } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  faLeft= faChevronLeft
  faRight= faChevronRight
  faTools = faTools;
  faChair=faChair
  productos:Producto[]=[];
  productos2:Producto[]=[];

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
 
    private carritoService:CarritoService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe( productos =>{
      this.productos =productos
    
      this.productos = this.productos.slice(0, 3) 
  
      this.productos2 = productos.slice(4, 7) 
    

    })
  }

}
