import {Personne} from "./Personne";
import {PatientJSON} from "./patJSON";
import {Subject} from "rxjs/Subject";

export class Patient extends Personne {

    //attributs de la classe Patient (nom, prénom, adresse (depuis la classe Personne qu'elle étend), 
    //n° de sécurité sociale, sexe, date de naissance, téléphone, pathologie)
    secuId : string;
    sex : string;
    birthday : string;
    tel : string;
    pathology : string; 

    //constructeur
    constructor (name: string, firstname: string, address: string, secuId: string, 
                sex: string, birthday: string, tel: string , pathology: string) {
        super(name, firstname, address);
        this.secuId = secuId;
        this.sex = sex;
        this.birthday = birthday;
        this.tel = tel;
        this.pathology = pathology;
    }

    //partie getters
    getSecuId(): string {
        return this.secuId;
    }

    getSex(): string {
        return this.sex;
    }

    getBirthday(): string {
        return this.birthday;
    }

    getTel(): string {
        return this.tel;
    }

    getPathology(): string {
        return this.pathology;
    }

    //retourne l'objet au format JSON
    toJSON(): PatientJSON {
        return Object.assign({}, super.toJSON(), {
            secuId : this.getSecuId(),
            sex : this.getSex(),
            birthday : this.getBirthday(),
            tel : this.getTel(),
            pathology : this.getPathology()});
    }
}

//initalisation de la map contenant tous les patients
export const mapPatient = new Map<string, Patient>();

//initialisation des sujets et observables pour l'ajout & la suppression (pour communiquer avec Angular)
const addPatientSubject = new Subject<Patient>();
export let addPatientObservable = addPatientSubject.asObservable();
const removePatientSubject = new Subject<Patient>();
export let removePatientObservable = removePatientSubject.asObservable();

//fonction pour ajouter un patient dans la map et activer l'observable d'ajout
export function addPatient(name: string, firstname: string, address: string, secuId: string, 
                        sex: string, birthday: string, tel: string, pathology: string): Patient {
    const P = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    mapPatient.set(P.getSecuId(), P);
    addPatientSubject.next(P);
    return P;
}

//fonction pour ajouter un patient dans la map à partir de la DB
export function addPatientDB(name: string, firstname: string, address: string, secuId: string, 
                        sex: string, birthday: string, tel: string, pathology: string): Patient {
    const P = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    mapPatient.set(P.getSecuId(), P);
    return P;
}

//fonction pour récupérer le patient dans la map correspondant à l'id
export function getPatientFromSocial(secuId: string): Patient {
    return mapPatient.get(secuId);
}

//fonction qui retourne la map de patients
export function getAllPatients(): Map<string, Patient> {
    return mapPatient;
}

//fonction pour supprimer un patient dans la map et activer l'observable de suppression
export function removePatient(secuId: string): boolean {
    const P = getPatientFromSocial(secuId);
    removePatientSubject.next(P);
    return mapPatient.delete(secuId);
}

//fonction pour mettre à jour un patient dans la map et activer les observables d'ajout et suppression
export function updatePatient(name: string, firstname: string, address: string, secuId: string, 
                            sex: string, birthday: string, tel: string, pathology: string): Patient {
    const P = getPatientFromSocial(secuId);
    const updP = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    mapPatient.set(secuId, updP);
    removePatientSubject.next(P);
    addPatientSubject.next(P);
    return P;
}