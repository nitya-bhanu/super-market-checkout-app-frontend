export interface prodcutsList{
    productId:string;
    orderedProductQuantity:number;
}
export interface cartSchema{
    userId:string;
    productAndQuantityList:Array<prodcutsList>
}