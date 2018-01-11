"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personne_1 = require("./Personne");
const Subject_1 = require("rxjs/Subject");
class Patient extends Personne_1.Personne {
    //constructeur
    constructor(name, firstname, address, secuId, sex, birthday, tel, pathology) {
        super(name, firstname, address);
        this.secuId = secuId;
        this.sex = sex;
        this.birthday = birthday;
        this.tel = tel;
        this.pathology = pathology;
    }
    //partie getters
    getSecuId() {
        return this.secuId;
    }
    getSex() {
        return this.sex;
    }
    getBirthday() {
        return this.birthday;
    }
    getTel() {
        return this.tel;
    }
    getPathology() {
        return this.pathology;
    }
    //retourne l'objet au format JSON
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            secuId: this.getSecuId(),
            sex: this.getSex(),
            birthday: this.getBirthday(),
            tel: this.getTel(),
            pathology: this.getPathology()
        });
    }
}
exports.Patient = Patient;
//initalisation de la map contenant tous les patients
exports.mapPatient = new Map();
//initialisation des sujets et observables pour l'ajout & la suppression (pour communiquer avec Angular)
const addPatientSubject = new Subject_1.Subject();
exports.addPatientObservable = addPatientSubject.asObservable();
const removePatientSubject = new Subject_1.Subject();
exports.removePatientObservable = removePatientSubject.asObservable();
//fonction pour ajouter un patient dans la map et activer l'observable d'ajout
function addPatient(name, firstname, address, secuId, sex, birthday, tel, pathology) {
    const P = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    exports.mapPatient.set(P.getSecuId(), P);
    addPatientSubject.next(P);
    return P;
}
exports.addPatient = addPatient;
//fonction pour ajouter un patient dans la map à partir de la DB
function addPatientDB(name, firstname, address, secuId, sex, birthday, tel, pathology) {
    const P = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    exports.mapPatient.set(P.getSecuId(), P);
    return P;
}
exports.addPatientDB = addPatientDB;
//fonction pour récupérer le patient dans la map correspondant à l'id
function getPatientFromSocial(secuId) {
    return exports.mapPatient.get(secuId);
}
exports.getPatientFromSocial = getPatientFromSocial;
//fonction qui retourne la map de patients
function getAllPatients() {
    return exports.mapPatient;
}
exports.getAllPatients = getAllPatients;
//fonction pour supprimer un patient dans la map et activer l'observable de suppression
function removePatient(secuId) {
    const P = getPatientFromSocial(secuId);
    removePatientSubject.next(P);
    return exports.mapPatient.delete(secuId);
}
exports.removePatient = removePatient;
//fonction pour mettre à jour un patient dans la map et activer les observables d'ajout et suppression
function updatePatient(name, firstname, address, secuId, sex, birthday, tel, pathology) {
    const P = getPatientFromSocial(secuId);
    const updP = new Patient(name, firstname, address, secuId, sex, birthday, tel, pathology);
    exports.mapPatient.set(secuId, updP);
    removePatientSubject.next(P);
    addPatientSubject.next(P);
    return P;
}
exports.updatePatient = updatePatient;
