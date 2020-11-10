import { Usuario }  from "./usuario";
import { Direccion }  from "./direccion";
import { Carrito }  from "./carrito";
export class  Compra{

  id: number;
  fechaCompra: Date;
  valorTotal:number;
  estado: boolean;
  usuario:Usuario;
  estadoEnvio:boolean;
  direccion: Direccion;
  carrito:Carrito;
}
