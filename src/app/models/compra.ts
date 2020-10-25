import { Carrito }  from "./carrito";

export class  Compra{

  id: number;
  fechaCompra: Date;
  valorTotal:number;
  estado: boolean;
  carrito:Carrito;

}
