import { IAddress } from './address';

export interface IOrder {
    $key: string;
    productReference: string;
    userMail: string;
    userID: string;
    shippingAddress: IAddress;
    price: number;
    tax: number;
    amountPaid: number;
    payPalStatus: string;
    fullfilled: boolean;

}
