import { GenericResponse } from "./genericProductResponse";

export interface  RequestedProductSchema{
    title:string;
    category:string;
    quantity:number;
    description:number;
}
export interface RequestedProductsGenericResponse extends GenericResponse{
    data:RequestedProductSchema
}