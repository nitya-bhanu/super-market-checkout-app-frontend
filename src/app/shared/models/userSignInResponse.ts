import { GenericResponse } from "./genericProductResponse";

export interface UserSignInSchema{
    userId:string;
    bool:boolean;
    role:string;
}
export interface GenericUserSignInResponse extends GenericResponse{
    data:UserSignInSchema
}