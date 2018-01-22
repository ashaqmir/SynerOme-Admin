import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  pageTitle: string;
  productKey: string;
  public productDetails: any = {
    $key: '',
    name: '',
    shortDescription: '',
    longDescriptions: '',
    features: '',
    additionalfeatures: '',

    currency: 'USD',
    price: 0.0,
    discount: 0.0,
    discountPrice: 0.0,
    taxPer: 0.0,
    totalPrice: 0.0,

    isHot: false,
    isActive: false
  };

  constructor(private prodSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const key = this.route.params.subscribe(params => {
      this.productKey = params['id'];
      console.log(this.productKey);
      this.pageTitle = this.productKey ? 'Edit Product' : 'Edit Product';

      if (!this.productKey) {
        return;
      }

      this.prodSvc.getProduct(this.productKey).subscribe(product => {
        console.log(product);
        if (product) {

          let prodFeatures = '';
          let prodAditiontoanlFeatures = '';
          if (product.features) {
            prodFeatures = product.features.join('|');
          }
          if (product.additionalfeatures) {
            prodAditiontoanlFeatures = product.additionalfeatures.join('|');
          }

          this.productDetails.name = product.name;
          this.productDetails.shortDescription = product.shortDescription;
          this.productDetails.longDescriptions = product.longDescriptions;

          this.productDetails.features = prodFeatures;
          this.productDetails.additionalfeatures = prodAditiontoanlFeatures;

          this.productDetails.currency = product.currency;
          this.productDetails.price = product.price;
          this.productDetails.discount = product.discount;

          this.productDetails.discountPrice = product.discountPrice;
          this.productDetails.taxPer = product.taxPer;

          this.productDetails.isHot = product.isHot;
          this.productDetails.isActive = product.enabled;

          this.productDetails.totalPrice = this.productDetails.discountPrice +
            (this.productDetails.taxPer * this.productDetails.discountPrice);
        }
      });

    });
  }

  save() {
    const product = {
      name: this.productDetails.name,
      shortDescription: this.productDetails.shortDescription,
      longDescriptions: this.productDetails.longDescriptions,
      currency: this.productDetails.currency,
      price: this.productDetails.price,
      discount: this.productDetails.discount,
      taxPer: this.productDetails.taxPer,
      isHot: this.productDetails.isHot,
      enabled: this.productDetails.isActive
    } as IProduct;

    product.features = this.splitFeatures(this.productDetails.features, '|');
    product.additionalfeatures = this.splitFeatures(this.productDetails.additionalfeatures, '|');
    if (this.productDetails.discount && this.productDetails.discount > 0) {
      product.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
    } else {
      product.discountPrice = this.productDetails.price;
    }
    if (this.productDetails.taxPer && this.productDetails.taxPer > 0) {
      product.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
    } else {
      product.discountPrice = this.productDetails.price;
    }

    if (!this.productKey) {
      this.prodSvc.createProduct(product).then(prod => {
        this.router.navigate(['/dashboard/productlist']);
      });
    } else {
      this.prodSvc.updateProduct(this.productKey, product);
      this.router.navigate(['/dashboard/productlist']);
    }
    console.log(this.productDetails);
    console.log(product);
  }

  priceInfoChanged(val: string) {
    const pPegX = /^[1-9][0-9]*(?:\.\d*)?$/g;
    if (pPegX.test(val)) {
      const dtRegX = /^0\.\d{1,3}$/g;
      if (dtRegX.test(this.productDetails.discount)) {
        this.productDetails.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
      } else {
        this.productDetails.discountPrice = this.productDetails.price;
      }

      if (dtRegX.test(this.productDetails.taxPer)) {
        this.productDetails.totalPrice = this.productDetails.discountPrice +
          (this.productDetails.taxPer * this.productDetails.discountPrice);
      } else {
        this.productDetails.totalPrice = this.productDetails.discountPrice;
      }
    }
  }

  discountChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
      this.productDetails.totalPrice = this.productDetails.discountPrice;
    } else {
      this.productDetails.discountPrice = this.productDetails.price;
      this.productDetails.totalPrice = this.productDetails.discountPrice;
    }

  }

  taxChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.totalPrice = this.productDetails.discountPrice + (this.productDetails.taxPer * this.productDetails.discountPrice);
    } else {
      this.productDetails.totalPrice = this.productDetails.discountPrice;
    }
  }

  private splitFeatures(features, sperator) {
    let resultArray: string[] = null;

    if (features) {
      if (features.indexOf(sperator) >= 0) {
        resultArray = features.split(sperator);
      } else {
        resultArray.push(features);
      }
    }
    return resultArray;
  }
}
