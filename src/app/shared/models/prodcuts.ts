import { GenericProductsResponse } from "./genericProductResponse";

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
export interface GetProductsSchemaData extends GenericProductsResponse{
    data:prodcutsSchema[]
}
export interface GetSingleProductsSchemaData extends GenericProductsResponse{
    data:prodcutsSchema;
}