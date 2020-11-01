import { CarritoProducto } from "./carritoProducto"
import {Usuario} from "./usuario";
export class Carrito {
  id: number;
  estado: boolean;
  valor: number;
  carritoProducto: Array<CarritoProducto>= [];
  usuario:Usuario;
}
