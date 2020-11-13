import {
  Component,
  OnInit
} from '@angular/core';

import {
  Producto
} from '../../models/producto';
import {
  Imagen
} from '../../models/imagen';
import {
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  AuthService
} from '../../service/auth.service';
import {
  ProductoService
} from '../../service/producto.service';
import {
  ModalService
} from '../../service/modal.service';
import Swal from 'sweetalert2';
import {
  ProductoForm
} from '../../models/productoForm';
import swal from 'sweetalert2';
import {
  CarritoService
} from '../../service/carrito.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {


  faCart = faShoppingCart
  producto: Producto = new Producto();
  productoId: number;
  imagen: Imagen = new Imagen();
  productos: Producto[];
  cantidad: number = 1;
  imagenes: Imagen[] = [];
  nombreProducto = ""
  imagenAuxiliar: Imagen;

  productoForm: ProductoForm = new ProductoForm();

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private router: Router,
    public authService: AuthService,
    private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarProducto();

  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.productoId = id;
      if (id) {
        this.productoService.getProductoById(id)
          .subscribe((producto) => {
            this.nombreProducto = producto.nombre;
            this.producto = producto
            this.imagenes = this.producto.imagenes;
          });
      }
    })
  }

  abrirModal(id: number) {

    this.productoId = id;
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
  aumentaCantidad(): number {
    if (this.cantidad == this.producto.stock) {
      return this.cantidad = this.producto.stock
    }
    return this.cantidad += 1;
  }
  disminuyeCantidad(): number {
    if (this.cantidad == 0) {
      return this.cantidad = 0;
    }
    return this.cantidad -= 1;
  }

  cambiarImagen(index: number): void {
    this.imagenAuxiliar = this.imagenes[0];
    this.imagenes[0] = this.imagenes[index];
    this.imagenes[index] = this.imagenAuxiliar;
  }

  public addProductToCart(cantidad: number, id: number): any {

    this.productoForm.cantidad = cantidad;
    this.productoForm.productoId = id;
    this.carritoService.addProductToCart(this.productoForm).subscribe(
      response => {
        swal.fire('Producto agregado', ` Producto Agregado con exito al carrito`, 'success');
      }
    );
  }
}
