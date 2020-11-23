import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../service/servicio.service';

import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-formulario-servicios',
  templateUrl: './formulario-servicios.component.html',
  styleUrls: ['./formulario-servicios.component.css']
})
export class FormularioServiciosComponent implements OnInit {

  public servicio: Servicio = new Servicio();

  constructor(private servicioService:ServicioService,private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarServicio();
  }

  public crearServicio():void{
    this.servicioService.createServicio(this.servicio)
    .subscribe( servicio =>{
      this.router.navigate(['/servicios'])
      swal.fire('Nuevo Servicio',` Servicio ${servicio.nombre} creado con exito!`,'success');

    })

  }

  public cargarServicio():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.servicioService.getServicioById(id)
        .subscribe((servicio) =>this.servicio=servicio
        
        );
       
      }
    })
  }

  public modificarServicio():void {
    this.servicioService.updateServicio(this.servicio)
    .subscribe(servicio => {
      this.router.navigate(['/servicios'])
      swal.fire('Servicio Actualizado', `Producto ${this.servicio.nombre} Actualizado con exito!`, 'success')

    })
  }

}
