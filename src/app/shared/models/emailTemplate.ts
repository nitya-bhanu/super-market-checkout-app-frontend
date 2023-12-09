export interface EmailTemplate{
    toEmailAddress:string;
    subjectEmail:string;
    text:string;
}
export interface EmailAllTemplate{
    toEmailAddress:Array<string>;
    subjectEmail:string;
    text:string;
}