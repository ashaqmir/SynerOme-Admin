import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Promise, resolve } from 'q';
import { IOrder } from '../../../models/order';


@Injectable()
export class OrderService {

  private basePath = '/Orders';

  ordersRef: AngularFireList<IOrder>;

  constructor(private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.basePath);
  }

  // Return an observable list of products
  getOrdersList(): Observable<IOrder[]> {
    return this.ordersRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
    });
  }

  // Return a single observable item
  getOrder(key: string): Observable<IOrder | null> {
    const orderPath = `${this.basePath}/${key}`;
    const order = this.db.object(orderPath).valueChanges() as Observable<IOrder | null>;
    return order;
  }

  // Create a brand new product
  createOrder(order: IOrder): PromiseLike<any> {
    return this.ordersRef.push(order).then(prod => {
      if (prod) {
        return resolve(prod);
      }
    });
  }

  // Update an exisiting product
  updateOrder(key: string, value: any): void {
    this.ordersRef.update(key, value);
  }

  // Deletes a single product
  deleteOrder(key: string): void {
    this.ordersRef.remove(key);
  }

  // Deletes the entire list of products
  deleteAll(): void {
    this.ordersRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }

}
