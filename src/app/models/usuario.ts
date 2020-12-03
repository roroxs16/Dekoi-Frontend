import {Carrito} from './carrito'
import {Compra} from './compra'
import {Reunion} from './reunion'
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
  reuniones: Reunion[] = [];
}
