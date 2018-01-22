import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../../models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  @Input() order: IOrder;
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
