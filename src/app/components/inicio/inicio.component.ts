import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { CarritoService } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { CategoriaService } from '../../service/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { faChevronLeft, faChevronRight, faTools, faChair } from '@fortawesome/free-solid-svg-icons';
import { ProductoForm } from '../../models/productoForm';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
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
  productoForm:ProductoForm = new ProductoForm();
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
