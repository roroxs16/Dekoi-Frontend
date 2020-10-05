import { Imagen } from './imagen'
import { Categoria } from './categoria'

export class Producto{
  id: number;
  nombre: string;
  stock: number;
  descripcion: string;
  valorUnitario:number;
  codigoDeBarra:string;
  imagenes:Array<Imagen> =[];
  categoria: Categoria;
}
