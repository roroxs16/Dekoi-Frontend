import { Producto } from "./producto";


export class ProductoCompra{

  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number){
    this.producto = producto;
    this.cantidad = cantidad;
  }

}
