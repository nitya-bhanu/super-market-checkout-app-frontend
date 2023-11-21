import { prodcutsList } from "./cart";
import { GenericResponse } from "./genericProductResponse";
export interface orderSchema{
    orderID:string;
    userId:string;
    orderDate:string;
    productAndQuantityList:Array<prodcutsList>;
    totalMoney:number;
}
export interface GenericOrderResponse extends GenericResponse{
    data:orderSchema
}