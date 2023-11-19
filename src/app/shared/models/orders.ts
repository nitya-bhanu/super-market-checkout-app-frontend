import { prodcutsList } from "./cart";
export interface orderSchema{
    orderID:string;
    userId:string;
    orderDate:string;
    productAndQuantityList:Array<prodcutsList>;
    totalMoney:number;
}