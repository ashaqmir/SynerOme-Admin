import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<IProduct[]>;

  constructor(private prodSvc: ProductService,
    private router: Router) {
    this.products = this.prodSvc.getProductsList();
  }

  ngOnInit() {
  }

  addProduct() {
    this.router.navigate(['/dashboard/addproduct/new']);
  }
}
