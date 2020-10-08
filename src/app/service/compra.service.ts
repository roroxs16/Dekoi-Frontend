import { ProductoCompra } from "../models/productoCompra";
import { Subject } from "rxjs/internal/Subject";
import { ProductoCompras } from "../models/productoCompras";
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private urlEndPoint: string = 'http://localhost:8080/api/compras';

  private productoCompra: ProductoCompra;
  private compras: ProductoCompras = new ProductoCompras();

  private productoCompraSubject = new Subject();
  private comprasSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  ProductoCompraChanged = this.productoCompraSubject.asObservable();
  ComprasChanged = this.comprasSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();


  constructor(private http: HttpClient) {

  }

  saveCompra(compra: ProductoCompras) {
    return this.http.post(this.urlEndPoint, compra);
  }

  set SelectedProductoCompra(value: ProductoCompra) {
    this.productoCompra = value;
    this.productoCompraSubject.next();
  }

  get SelectedProductoComprar() {
    return this.productoCompra;
  }

  set ProductoCompras(value: ProductoCompras) {
    this.compras = value;
    this.comprasSubject.next();
  }

  get ProductoCompras() {
    return this.compras;
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }
}
