import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  totalPrice: number;

  @Input() product: IProduct;
  constructor(private router: Router) { }

  ngOnInit() {
    this.totalPrice = this.product.discountPrice + (this.product.taxPer * this.product.discountPrice);
  }

  editProduct() {
    this.router.navigate(['/dashboard/addproduct', this.product.$key]);
  }
}
