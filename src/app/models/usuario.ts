import {Carrito} from './carrito'
import {Compra} from './compra'
export class Usuario {
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  direccion:string;
  ciudad:string;
  numeroTelefono:number;

  password:string;
  rut:string;
  roles:string[]=[];
  carrito:Carrito[]=[]
    compras:Compra[]=[]
}
