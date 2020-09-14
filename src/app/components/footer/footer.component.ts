import { Component, OnInit } from '@angular/core';
import { faPhone, faEnvelope, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {    } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faClock=faClock;
  faMapMarkerAlt=faMapMarkerAlt;


  constructor() { }

  ngOnInit(): void {
  }

}
