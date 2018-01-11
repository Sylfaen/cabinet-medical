import {PersonneJSON} from "./persJSON";

export interface PatientJSON extends PersonneJSON {
    name : string;
    firstname : string;
    address : string;
    secuId : string;
    sex : string;
    birthday : string;
    tel : string;
    pathology : string;  
}