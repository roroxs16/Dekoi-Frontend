import {
  Usuario
} from './usuario';


export class Reunion {

  id: number;
  fechaHora: Date;
  codigoReunion: String;
  estado: boolean;
  usuario: Usuario;
  servicio: Array<Reunion>=[];
}
