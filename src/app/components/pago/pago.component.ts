import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  faLeft = faChevronLeft;
  faRight = faChevronRight;

  valorTotal: string;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params =>{
      this.valorTotal = params.get('valorCompra')
    
    })
  }

}
