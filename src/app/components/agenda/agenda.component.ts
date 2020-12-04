import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ScheduleComponent,
  CurrentAction,
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';


import {
  Reunion
} from '../../models/reunion';
import {
  ReunionPojo
} from '../../models/reunionPojo';

import {
  ReunionService
} from '../../service/reunion.service';

import {
  ServicioService
} from '../../service/servicio.service';
import {
  ActivatedRoute
} from '@angular/router';


import swal from 'sweetalert2';
import {
  Router
} from '@angular/router';
import {
  Servicio
} from '../../models/servicio';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private reunionService: ReunionService,
    private router: Router,
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute) {}

  @ViewChild('scheduleObj', {
    static: true
  })

  public scheduleObj: ScheduleComponent

  public data: ReunionPojo[] = new Array();

  private selectionTarget: Element;

  public setDate = new Date();

  public reuniones: Reunion[] = [];

  public servicio: Servicio;

  public eventObject: EventSettingsModel = {
    dataSource: this.data
  }

  ngOnInit(): void {

    this.loadReuniones();
    this.loadServicio();

  }

  public loadReuniones(): void {
    this.reunionService.getReuniones().subscribe(reuniones => {
      this.reuniones = reuniones;



      for (var i = 0; i < this.reuniones.length; i++) {
        let obj: ReunionPojo = new ReunionPojo;
        obj.Id = this.reuniones[i].id;
        obj.Subject = this.reuniones[i].servicio.nombre;
        obj.Description = this.reuniones[i].codigoReunion;
        obj.StartTime = new Date(this.reuniones[i].fechaInicio);
        obj.EndTime = new Date(this.reuniones[i].fechaTermino);
        this.data.push(obj);
      }

    })
  }

  public onCreate() {
    const scheduleObj = this.scheduleObj
  }

  public dateParser(data: string) {
    return new Date(data)
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    this.selectionTarget = null;
    this.selectionTarget = args.target;
  }

  public onDetailsClick(): void {
    this.onCloseClick();
    const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    this.scheduleObj.openEditor(data, 'Add');
  }

  public onCloseClick(): void {
    this.scheduleObj.quickPopup.quickPopupHide();
  }
  public onAddClick(): void {
    this.onCloseClick();
    const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    const eventData: {
      [key: string]: Object
    } = this.scheduleObj.eventWindow.getObjectFromFormData('e-quick-popup-wrapper');
    this.scheduleObj.eventWindow.convertToEventData(data as {
      [key: string]: Object
    }, eventData);
    eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
    this.scheduleObj.addEvent(eventData);
    //EndTime StartTime

    let last = Object.values(data);
    let fechaInicio = this.dateToISOLikeButLocal(last[0]);


    let fechaFin = this.dateToISOLikeButLocal(last[1]);



    this.reunionService.agregarReuniones(fechaInicio, fechaFin, this.servicio.id).subscribe(reunion => {
      //this.router.navigate(['/servicios'])
      swal.fire('Nueva Reunion', `Reunion agendad con exito!`, 'success');
    })

    window.location.reload()
  }
  public dateToISOLikeButLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
  }

  public loadServicio(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.servicioService.getServicioById(id)
          .subscribe((servicio) => this.servicio = servicio

          );

      }
    })
  }
}
