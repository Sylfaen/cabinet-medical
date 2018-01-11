"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nurse_1 = require("./class/Nurse");
const Patient_1 = require("./class/Patient");
//import de mongoose
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//création du schéma pour le patient dans mongoDB
const patientSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    address: String,
    secuId: { type: String, unique: true },
    sex: String,
    birthday: String,
    tel: String,
    pathology: String,
});
const PatientModel = mongoose.model("patients", patientSchema);
//création du schéma pour la nurse dans mongoDB
const nurseSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    address: String,
    id: { type: String, unique: true }
});
const NurseModel = mongoose.model("nurses", nurseSchema);
//abonnement aux observables créés précédemment et lien avec mongoDB
Nurse_1.addNurseObservable.subscribe(Nurse => { addNurseIntoMongo(Nurse); });
Nurse_1.removeNurseObservable.subscribe(Nurse => { removeNurseIntoMongo(Nurse); });
Patient_1.addPatientObservable.subscribe(Patient => { addPatientIntoMongo(Patient); });
Patient_1.removePatientObservable.subscribe(Patient => { removePatientIntoMongo(Patient); });
//ajout d'une nurse dans mongoDB
function addNurseIntoMongo(n) {
    connexionBD();
    console.log("Ajout d'une nurse : " + n);
    let nurse = new NurseModel({ name: n.getName(), firstname: n.getFirstname(), address: n.getAddress(), id: n.getId() });
    nurse.save(function (err, n) {
        if (err) {
            console.log(err + "\n" + n);
        }
        else {
            console.log("Ajout Nurse OK");
        }
    });
}
exports.addNurseIntoMongo = addNurseIntoMongo;
//suppression d'une nurse dans mongoDB
function removeNurseIntoMongo(n) {
    connexionBD();
    console.log("Suppression d'une nurse : " + n.id);
    NurseModel.remove({ id: n.id });
}
exports.removeNurseIntoMongo = removeNurseIntoMongo;
//ajout d'un patient dans mongoDB
function addPatientIntoMongo(p) {
    connexionBD();
    console.log("Ajout d'un patient : " + p);
    let patient = new PatientModel({ name: p.getName(), firstname: p.getFirstname(), address: p.getAddress(),
        secuId: p.getSecuId(), sex: p.getSex(), birthday: p.getBirthdayId(), tel: p.getTel(), pathology: p.getPathology() });
    patient.save(function (err, p) {
        if (err) {
            console.log(err + "\n" + p);
        }
        else {
            console.log("Ajout Patient OK");
        }
    });
}
exports.addPatientIntoMongo = addPatientIntoMongo;
//suppression d'un patient dans mongoDB
function removePatientIntoMongo(p) {
    connexionBD();
    console.log("Suppression d'un patient : " + p.secuId);
    PatientModel.remove({ secuId: p.secuId });
}
exports.removePatientIntoMongo = removePatientIntoMongo;
//fonction de connexion à mongoDB en local
function connexionBD() {
    let uri = "mongodb://127.0.0.1:27017/cabinet-medical";
    mongoose.connect(uri, { useMongoClient: true }).then(() => { console.log("Connexion MongoDB OK"); }, (error) => { console.log("Problème de connexion : " + error); });
}
exports.connexionBD = connexionBD;
//fonction de remplissage de la map à partir de la base de données mongoDB
function loadDB() {
    connexionBD();
    NurseModel.find(function (error, mapNurse) {
        if (error)
            return console.error(error);
        mapNurse.forEach(function (n) {
            Nurse_1.addNurseDB(n.name, n.firstname, n.address, n.id);
        });
        console.log(mapNurse);
    });
    PatientModel.find(function (error, mapPatient) {
        if (error)
            return console.error(error);
        mapPatient.forEach(function (p) {
            Patient_1.addPatientDB(p.name, p.firstname, p.address, p.secuId, p.sex, p.birthday, p.tel, p.pathology);
        });
        console.log(mapPatient);
    });
}
exports.loadDB = loadDB;
