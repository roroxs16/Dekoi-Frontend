import { Producto } from "./producto";
import {Carrito} from "./carrito";

export class CarritoProducto{
  id: number;
  cantidad: number;
  producto: Producto;
  carrito: Carrito;
}
