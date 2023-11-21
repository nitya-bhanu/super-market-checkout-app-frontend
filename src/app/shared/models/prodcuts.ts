import { GenericResponse } from "./genericProductResponse";

export interface prodcutsSchema{
    prodId:string;
    quantity:number;
    price:number;
    title:string;
    category:string;
    rating:number;
    description:string;
    imageUrl:string;
}
export interface GetProductsSchemaData extends GenericResponse{
    data:prodcutsSchema[]
}
export interface GetSingleProductsSchemaData extends GenericResponse{
    data:prodcutsSchema;
}