import { GenericResponse } from "./genericProductResponse";

export interface prodcutsList{
    productId:string;
    orderedProductQuantity:number;
}

export interface cartSchema{
    userId:string;
    productAndQuantityList:Array<prodcutsList>
}

export interface GenericProductsListResponse extends GenericResponse{
    data:prodcutsList
}

export interface GenericCartSchemaResponse extends GenericResponse{
    data:cartSchema
}
