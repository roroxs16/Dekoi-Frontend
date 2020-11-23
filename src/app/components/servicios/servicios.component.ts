import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../service/servicio.service';
import { faTools, faChair, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
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
  constructor(private servicioService: ServicioService,  public authService: AuthService) { }

  ngOnInit(): void {
    this.getServicios();
  }

  private getServicios():void{
    this.servicioService.getServicios()
    .subscribe(response=>{
      this.servicios=response;

    })
  }

  delete(servicio:Servicio): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "¿Seguro que desea eliminar el Servicio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimninar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioService.deleteServicio(servicio.id).subscribe(
          response => {
            this.servicios = this.servicios.filter(ser => ser !== servicio)
            swalWithBootstrapButtons.fire(
              'Servicio eliminado!',
              'Servicio Eliminado con exito!',
              'success'
            )
          }
        )


      }
    })
  }



}
