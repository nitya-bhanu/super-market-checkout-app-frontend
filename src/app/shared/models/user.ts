import { GenericResponse } from "./genericProductResponse";

export interface userSchema{
    userId:string;
    role:string;
    name:string,
    emailId:string;
    phoneNumber:string;
    loyaltyBalance:number;
}

export interface setUserSchema{
    name:string;
    emailId:string;
    phoneNumber:string;
    loyaltyBalance:number;
    password:string;
    role:string;
}

export interface GenericUserResponse extends GenericResponse{
    data:userSchema
}