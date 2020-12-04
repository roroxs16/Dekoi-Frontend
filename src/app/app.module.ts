import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriaComponent } from './components/categoria/categoria.component';

import { CategoriaService } from './service/categoria.service';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioProductosComponent } from './components/productos/formulario-productos.component';
import { VerProductoComponent } from './components/productos/ver-producto.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SubirFotoComponent } from './components/subir-foto/subir-foto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './service/guards/auth.guard';
import { RoleGuard } from './service/guards/role.guard';
import { TokenInterceptor } from './service/interceptors/token.interceptor';
import { AuthInterceptor } from './service/interceptors/auth.interceptor';
import { DireccionComponent } from './components/direccion/direccion.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MisdatosComponent } from './components/usuario/misdatos.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DetalleCompraComponent } from './components/usuario/detalle-compra.component';
import { UsuariodireccionComponent } from './components/usuario/usuariodireccion.component';
import { PagoComponent } from './components/pago/pago.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AdminProductosComponent } from './components/usuario/admin/adminproductos/adminproductos.component';
import { FormularioServiciosComponent } from './components/servicios/formulario-servicios.component';
import { DropDownListModule} from '@syncfusion/ej2-angular-dropdowns'
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars'

import { ScheduleModule, RecurrenceEditorModule, DayService,WeekService,WorkWeekService,MonthAgendaService,MonthService } from '@syncfusion/ej2-angular-schedule';
import { AgendaComponent } from './components/agenda/agenda.component';

registerLocaleData(localeEs, 'es');
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: InicioComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/page/:page', component: ProductosComponent },
  { path: 'productos/formulario', component: FormularioProductosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'categoria/formulario', component: CategoriaComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'producto/formulario/:id', component: FormularioProductosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'producto/:id', component: VerProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'detallecompra/:id', component: DetalleCompraComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'pago', component: PagoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicios/formulario/:id', component: FormularioServiciosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'servicios/formulario', component: FormularioServiciosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/productos', component: AdminProductosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'agenda/:id', component: AgendaComponent, canActivate: [AuthGuard] },
  
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
    RegistroComponent,
    DireccionComponent,
    UsuarioComponent,
    MisdatosComponent,
    DetalleCompraComponent,
    UsuariodireccionComponent,
    PagoComponent,
    InicioComponent,
    ServiciosComponent,
    AdminProductosComponent,
    FormularioServiciosComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,DropDownListModule,
    DateTimePickerModule,
    RouterModule.forRoot(routes),
    ScheduleModule, RecurrenceEditorModule

  ],
  providers: [CategoriaService,{ provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DayService,
    WeekService,
    WorkWeekService,
    MonthAgendaService,
    MonthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
