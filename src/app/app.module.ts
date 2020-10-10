import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
<<<<<<< HEAD
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
=======
>>>>>>> parent of 71948bf... add gestion de productos

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    FooterComponent,
    CategoriaComponent,
    ProductosComponent,
    FormularioProductosComponent,
    VerProductoComponent,
    PaginatorComponent,
    SubirFotoComponent,
    ComprasComponent,
    CarritoComponent
=======
    FooterComponent
>>>>>>> parent of 71948bf... add gestion de productos
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
