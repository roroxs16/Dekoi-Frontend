import { Component, OnInit, Input } from '@angular/core';

import { Producto } from '../../models/producto';
import { ModalService } from '../../service/modal.service';

import { ProductoService } from '../../service/producto.service';

import { HttpEventType } from '@angular/common/http';

import swal from 'sweetalert2';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.css']
})
export class SubirFotoComponent implements OnInit {


  @Input() productoId: number;

  fotoSeleccionada: File;

  progreso: number = 0;


  constructor(public modalService: ModalService, private productoService: ProductoService) { }

  ngOnInit(): void {

  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error al seleccionar la imagen:', ' El archivo debe ser del tipo imagen ', 'error')
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      swal.fire('Error:', ' Debe Seleccionar una foto', 'error')
    } else {
      this.productoService.subirFoto(this.fotoSeleccionada, this.productoId)
        .subscribe(event => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            
          }


          swal.fire('La foto del producto se ha subido correctamente', `La foto se ha subido con exito!`, 'success');
        });
    }
  }
}
