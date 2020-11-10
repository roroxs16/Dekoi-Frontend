import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DireccionService } from '../../service/direccion.service';
import {Direccion} from '../../models/direccion'

import {Router} from '@angular/router';

import swal from 'sweetalert2'
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  faLeft = faChevronLeft;
  faRight = faChevronRight;
  faTrash = faTrash;
  direccion:Direccion = new Direccion();

  constructor(private direccionService: DireccionService,  private router: Router,) { }

  ngOnInit(): void {
  }

  crearDireccion(): void{

        this.direccionService.createDireccion(this.direccion)
        .subscribe( direccion => {
          this.router.navigate(['/productos'])
          swal.fire('Direccion de envío',` Direccion creado con exito!`,'success');
        }
        )
  }

}
