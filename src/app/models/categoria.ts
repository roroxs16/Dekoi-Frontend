import {Producto} from './producto';

export class Categoria {
  id: number;
  nombre: string;
  productos: Array<Producto> = [];
}
