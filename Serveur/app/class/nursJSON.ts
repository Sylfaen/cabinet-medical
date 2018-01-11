import {PersonneJSON} from "./persJSON";

export interface NurseJSON extends PersonneJSON {
    name : string;
    firstname : string;
    address : string;
    id : string;
}