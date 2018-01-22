import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Promise, resolve } from 'q';


@Injectable()
export class ProductService {

  private basePath = '/products';

  prodductsRef: AngularFireList<IProduct>;

  constructor(private db: AngularFireDatabase) {
    this.prodductsRef = db.list(this.basePath);
  }

  // Return an observable list of products
  getProductsList(): Observable<IProduct[]> {
    return this.prodductsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
    });
  }

  // Return a single observable item
  getProduct(key: string): Observable<IProduct | null> {
    const productPath = `${this.basePath}/${key}`;
    const product = this.db.object(productPath).valueChanges() as Observable<IProduct | null>;
    return product;
  }

  // Create a brand new product
  createProduct(product: IProduct): PromiseLike<any> {
    return this.prodductsRef.push(product).then(prod => {
      if (prod) {
        return resolve(prod);
      }
    });
  }

  // Update an exisiting product
  updateProduct(key: string, value: any): void {
    this.prodductsRef.update(key, value);
  }

  // Deletes a single product
  deleteProduct(key: string): void {
    this.prodductsRef.remove(key);
  }

  // Deletes the entire list of products
  deleteAll(): void {
    this.prodductsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }

}
