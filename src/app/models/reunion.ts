import {
  Usuario
} from './usuario';
import {
  Servicio
} from './servicio'


export class Reunion {

  id: number;
  fechaInicio: Date;
  fechaTermino: Date;
  codigoReunion: string;
  estado: string;
  usuario: Usuario;
  servicio: Servicio;
}
