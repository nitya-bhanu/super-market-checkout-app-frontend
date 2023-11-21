import { GenericResponse } from "./genericProductResponse";

export interface LoyaltyScehma{
    loyaltyId:string;
    levelValue:number;
    cashInValue:number;
}
export interface GenericLoyaltyResponse extends GenericResponse{
    data:LoyaltyScehma
}