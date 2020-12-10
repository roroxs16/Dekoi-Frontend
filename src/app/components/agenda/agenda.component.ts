import {
  Component,
  Inject,
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
  MonthService,EJ2Instance,
  PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DOCUMENT } from '@angular/common';
import { Dialog } from '@syncfusion/ej2-popups';
import {DomSanitizer} from '@angular/platform-browser';
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

import linkifyStr from 'linkifyjs/string';
import { L10n, loadCldr } from '@syncfusion/ej2-base';

declare let require: Function;
 loadCldr(

      require('../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
      require('../../../../node_modules/cldr-data/main/es/ca-gregorian.json'),
      require('../../../../node_modules/cldr-data/main/es/currencies.json'),
      require('../../../../node_modules/cldr-data/main/es/numbers.json'),
      require('../../../../node_modules/cldr-data/main/es/timeZoneNames.json')
    );
   L10n.load({
        "es": {
      "schedule": {
        "day": "Día",
        "week": "Semana",
        "workWeek": "Semana laboral",
        "month": "Mes",            
        "agenda": "Agenda",
        "weekAgenda": "Agenda semanal",
        "workWeekAgenda": "Agenda de la semana laboral",
        "monthAgenda": "Month Agenda",
        "today": "Hoy",
        "noEvents": "Sin eventos",
        "emptyContainer": "No hay eventos programados para hoy.",
        "allDay": "Todo el día",
        "start": "Inicio",
        "end": "Fin",
        "more": "Más",
        "close": "Cerrar",
        "cancel": "Cancelar",
        "noTitle": "(Sin título)",
        "delete": "Borrar",
        "deleteEvent": "Borrar evento",
        "deleteMultipleEvent": "Borrar eventos",
        "selectedItems": "Items seleccionados",
        "deleteSeries": "Borrar series",
        "edit": "Editar",
        "editSeries": "Editar series",
        "editEvent": "Editar evento",
        "createEvent": "Crear",
        "subject": "Título",
        "addTitle": "Añadir título",
        "moreDetails": "Más Detalles",
        "save": "Guardar",
        "editContent": "¿Quieres editar sólo este evento o la serie entera?",
        "deleteRecurrenceContent": "¿Quieres borrar sólo este evento o toda la serie?",
        "deleteContent": "¿Estás seguro de que quieres borrar este evento?",
        "deleteMultipleContent": "¿Estás seguro de que quieres borrar los eventos seleccionados?",
        "newEvent": "Nuevo evento",
        "title": "Título",
        "location": "Ubicación",
        "description": "Descripción",
        "timezone": "Zona horaria",
        "startTimezone": "Zona horaria inicial",
        "endTimezone": "Zona horaria final",
        "repeat": "Repetir",
        "saveButton": "Guardar",
        "cancelButton": "Cancelar",
        "deleteButton": "Borrar",
        "recurrence": "Recurrencia",
        "wrongPattern": "El patrón de recurrencia no es válido.",
        "seriesChangeAlert": "Los cambios hechos a instancias específicas de esta serie serán cancelados y esos eventos volverán a coincidir con la serie.",
        "createError": "La duración del evento debe ser más corta que la frecuencia con la que se produce. Acorta la duración o cambia el patrón de recurrencia en el editor de eventos de recurrencia.",
        "recurrenceDateValidation": "Algunos meses tienen menos de la fecha seleccionada. Para estos meses, la ocurrencia caerá en la última fecha del mes.",
        "sameDayAlert": "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
        "editRecurrence": "Editar recurrencia",
        "repeats": "Repeticiones",
        "alert": "Alerta",
        "startEndError": "La fecha final seleccionada se produce antes de la fecha de inicio.",
        "invalidDateError": "El valor de la fecha introducida no es válido.",
        "ok": "Ok",
        "occurrence": "Occurrencia",
        "series": "Series",
        "previous": "Anterior",
        "next": "Siguiente",
        "timelineDay": "Línea de tiempo diaria",
        "timelineWeek": "Línea de tiempo semanal",
        "timelineWorkWeek": "Línea de tiempo laboral",
        "timelineMonth": "Línea de tiempo mensual"
    },
    "recurrenceeditor": {
        "none": "Ninguno",
        "daily": "Diariamente",
        "weekly": "Semanalmente",
        "monthly": "Mensualmente",
        "month": "Mes",
        "yearly": "Anualmente",
        "never": "Nunca",
        "until": "Hasta",
        "count": "Cuenta",
        "first": "Primero",
        "second": "Segundo",
        "third": "Tercero",
        "fourth": "Cuarto",
        "last": "Último",
        "repeat": "Repetir",
        "repeatEvery": "Repetir cada",
        "on": "Repetir en",
        "end": "Fin",
        "onDay": "Día",
        "days": "Día(s)",
        "weeks": "Semana(s)",
        "months": "Mes(es)",
        "years": "Año(s)",
        "every": "cada",
        "summaryTimes": "tiempo(s)",
        "summaryOn": "en",
        "summaryUntil": "hasta",
        "summaryRepeat": "Repeticiones",
        "summaryDay": "día(s)",
        "summaryWeek": "semana(s)",
        "summaryMonth": "mes(es)",
        "summaryYear": "año(s)"
    },
    "calendar": {
      "today": "Hoy"
    },
  }
  });


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private reunionService: ReunionService,
    private router: Router,
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
    private sanitizer:DomSanitizer,
    @Inject(DOCUMENT) private document: Document) {}

  @ViewChild('scheduleObj', {
    static: true
  })
  public scheduleObj: ScheduleComponent


  
  @ViewChild("editButton")
  public editButton: ButtonComponent;

  public data: ReunionPojo[] = new Array();

  private selectionTarget: Element;

  public setDate = new Date();

  public reuniones: Reunion[] = [];

  public servicio: Servicio;

  public eventObject: EventSettingsModel = {
    dataSource: this.data
  }

  public showQuickInfo: boolean = true;

  public currentEvent;

  ngOnInit(): void {
    this.scheduleObj.locale='es'
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

  public dialogClose() {
    let dialogObj: Dialog = (document.querySelector('.e-schedule-dialog') as EJ2Instance).ej2_instances[0] as Dialog;
    dialogObj.hide();
  }

  public editEvent(e) {
  
    const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-schedule-dialog');
  

    this.scheduleObj.saveEvent(eventData);
    this.dialogClose();
    let last = Object.values(eventData);

    let descripcion = JSON.stringify(last[4])
    let id = Number(last[1])
 
    this.reunionService.editarReunion(descripcion, id).subscribe(reunion => {

      swal.fire('Nueva Reunion', `Reunion agendad con exito!`, 'success');
      this.router.navigate(['/servicios']);
    })
   
  }


  public onPopupOpen(args: PopupOpenEventArgs): void {
    this.selectionTarget = null;
    this.selectionTarget = args.target;
    if (args.type === 'Editor') {
      let dialogObj: Dialog = (args.element as EJ2Instance).ej2_instances[0] as Dialog;
  
      let buttons;
            buttons = [
          {
            buttonModel: { content: "Modificar", isPrimary: true },
            click: this.editEvent.bind(this)
          },
          {
            buttonModel: { content: "Cancelar", cssClass: "e-event-delete" },
            click: this.dialogClose.bind(this)
          }
        ];
      
      dialogObj.buttons = buttons;
      dialogObj.dataBind();
    }
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

      swal.fire('Nueva Reunion', `Reunion agendad con exito!`, 'success');
      this.router.navigate(['/servicios']);
    })

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
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
  goToMeeting(url:string): void{
    let link:string = this.linkify(url);;

    
    console.log(link)
    swal.fire('Link de reunion', `El link de su reunion es ${link}`, "success")
    //this.router.navigateByUrl(cleanUrl)
    //this.document.location.href=url;
  }

  private linkify(plainText): string{
    let replacedText;
    let replacePattern1;
    let replacePattern2;
    let replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = plainText.replace(replacePattern1, '$1');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$2');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
   }

}
