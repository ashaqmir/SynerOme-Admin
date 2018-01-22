import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { IOrder } from '../../../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Observable<IOrder[]>;

  constructor(private ordrSvc: OrderService,
    private router: Router) {
    this.orders = this.ordrSvc.getOrdersList();
  }

  ngOnInit() {
  }

}
