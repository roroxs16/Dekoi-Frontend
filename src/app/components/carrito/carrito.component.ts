import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ProductoCompra } from "../../models/productoCompra";
import { ProductoCompras } from "../../models/productoCompras";
import { Subscription } from "rxjs/internal/Subscription";
import { CompraService } from "../../service/compra.service";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  compraFinalizada: boolean;
  compras: ProductoCompras;
  total: number;
  sub: Subscription
  @Output() onOrderFinished: EventEmitter<boolean>;
  constructor(private compraService: CompraService) {
    this.total = 0
    this.compraFinalizada = false;
    this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  private calculateTotal(producto: ProductoCompra[]): number{
    let sum= 0;
    producto.forEach(value => {
      sum += (value.producto.valorUnitario *value.cantidad);
    })
    return sum;
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  finalizarCompra(){
    this.compraFinalizada = true;
    this.compraService.Total = this.total;
    this.onOrderFinished.emit(this.compraFinalizada);
  }

  cargarTotal(){
    this.sub = this.compraService.ComprasChanged.subscribe(()=>{
      this.total = this.calculateTotal(this.compras.ProductoCompras);
    })
  }

  loadCart(){
    this.sub = this.compraService.ProductoCompraChanged.subscribe(()=>{
      let compraProducto = this.compraService.SelectedProductoCompra;
      if(compraProducto){
        this.compras.ProductoCompras.push(new ProductoCompra(
          compraProducto.producto,compraProducto.cantidad
        ))
      }
      this.compraService.ProductoCompras=this.compras;
      this.compras = this.compraService.ProductoCompras;
      this.total = this.calculateTotal(this.compras.ProductoCompras);
    })
  }

  reset(){
    this.compraFinalizada=false;
    this.compras = new ProductoCompras();
    this.compras.ProductoCompras= [];
    this.total = 0;
  }

}
