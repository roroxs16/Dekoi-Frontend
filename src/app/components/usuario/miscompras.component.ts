import { Component, OnInit , Input} from '@angular/core';
import {Usuario} from '../../models/usuario';
@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.component.html',
  styleUrls: ['./miscompras.component.css']
})
export class MiscomprasComponent implements OnInit {

@Input() usuario: Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
