import { Component, OnInit } from '@angular/core';
import {ProductoCompras} from "../../models/productoCompras";
import {Subscription} from "rxjs/internal/Subscription";
import {CompraService} from "../../service/compra.service";



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  compras: ProductoCompras;
  total: number;
  pagado: boolean;
  sub: Subscription;

  constructor(private CompraService: CompraService) {
      this.compras=this.CompraService.ProductoCompras;
  }

  ngOnInit(): void {
    this.pagado = false;
    this.sub = this.CompraService.ComprasChanged.subscribe(()=>{
      this.compras = this.CompraService.ProductoCompras;
    })
    this.cargarTotal();
  }

  pagar(){
    this.pagado=true;
    this.CompraService.saveCompra(this.compras).subscribe();
  }

  cargarTotal(){
    this.sub = this.CompraService.TotalChanged.subscribe(()=>{
      this.total = this.CompraService.Total;
    })
  }

}
