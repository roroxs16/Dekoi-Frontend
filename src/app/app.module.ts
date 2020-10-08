import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriaComponent } from './components/categoria/categoria.component';

import {CategoriaService} from './service/categoria.service';

import { RouterModule, Routes} from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioProductosComponent } from './components/productos/formulario-productos.component';
import { VerProductoComponent } from './components/productos/ver-producto.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SubirFotoComponent } from './components/subir-foto/subir-foto.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CarritoComponent } from './components/carrito/carrito.component';


const routes : Routes =[
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'categorias', component:CategoriaComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'productos/page/:page', component:ProductosComponent},
  {path: 'productos/formulario', component:FormularioProductosComponent},
  {path: 'producto/formulario/:id', component:FormularioProductosComponent},
  {path: 'producto/:id', component:VerProductoComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CategoriaComponent,
    ProductosComponent,
    FormularioProductosComponent,
    VerProductoComponent,
    PaginatorComponent,
    SubirFotoComponent,
    ComprasComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
