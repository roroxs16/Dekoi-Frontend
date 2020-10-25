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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioProductosComponent } from './components/productos/formulario-productos.component';
import { VerProductoComponent } from './components/productos/ver-producto.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SubirFotoComponent } from './components/subir-foto/subir-foto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import {AuthGuard } from './service/guards/auth.guard';
import {RoleGuard } from './service/guards/role.guard';
import { TokenInterceptor } from './service/interceptors/token.interceptor';
import { AuthInterceptor } from './service/interceptors/auth.interceptor';

const routes : Routes =[
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: ProductosComponent},
  {path: 'categorias', component:CategoriaComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'productos/page/:page', component:ProductosComponent},
  {path: 'productos/formulario', component:FormularioProductosComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'categoria/formulario', component:CategoriaComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'producto/formulario/:id', component:FormularioProductosComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'producto/:id', component:VerProductoComponent},
  {path: 'carrito', component:CarritoComponent},
  {path: 'login', component:LoginComponent}
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
    CarritoComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [CategoriaService,
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true },
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
