import { GenericResponse } from "./genericProductResponse";

export interface userSchema{
    userId:string;
    role:string;
    name:string,
    emailId:string;
    phoneNumber:string;
    loyaltyBalance:number;
}
export interface GenericUserResponse extends GenericResponse{
    data:userSchema
}