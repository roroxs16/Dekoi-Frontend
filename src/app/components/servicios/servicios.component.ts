import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../service/servicio.service';
import { faTools, faChair, faPen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[]=[];
  faTools=faTools;
  faChair= faChair;
  faPen=faPen;
  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.getServicios();
  }

  private getServicios():void{
    this.servicioService.getServicios()
    .subscribe(response=>{
      this.servicios=response;
      console.log(this.servicios);
    })
  }



}
