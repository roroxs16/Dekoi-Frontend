import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faTools, faChair } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  faTools=faTools
  constructor() { }

  ngOnInit(): void {
  }

}
