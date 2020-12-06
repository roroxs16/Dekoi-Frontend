import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faTools, faChair } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faTools=faTools
  constructor() { }

  ngOnInit(): void {
  }

}
