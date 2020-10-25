export class Usuario {
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  direccion:string;
  ciudad:string;
  fechaNacimiento: Date;
  password:string;
  rut:string;
  roles:string[]=[];
}
