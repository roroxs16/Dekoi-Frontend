import { CarritoProducto } from "./carritoProducto"

export class Carrito {
  id: number;
  estado: boolean;
  valor: number;
  carritoProducto: Array<CarritoProducto>= [];
}
