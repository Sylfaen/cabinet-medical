import {addPatient, getPatientFromSocial, removePatient, Patient, mapPatient} from "./class/patient";
import {addNurse, getNurseFromId, getAllNurses, removeNurseFromId, Nurse} from "./class/nurse";

//router pour les patients
export function getRouterPatientRestAPI() {
    let express = require("express");
    let patientExp = new express.Router();

    //route pour ajouter un patient en POST
    patientExp.post("/addPatient", (req, res) => {
        const P: Patient = addPatient(req.body.name, req.body.firstname, req.body.address,
            req.body.secuId, req.body.sex, req.body.birthday, req.body.tel, req.body.pathology);
        if (req.body.name === undefined || req.body.firstname === undefined || req.body.address === undefined ||
            req.body.secuId === undefined || req.body.sex === undefined || req.body.birthday === undefined || 
            req.body.tel === undefined || req.body.pathology === undefined) {
            res.write("Attributes undefined !");
        }
        res.json(P.toJSON());
    });

    //route pour récupérer les informations d'un patient via son id en GET
    patientExp.get("/getPatient", (req, res) => {
        res.json(getPatientFromSocial(req.query.secuId));
    });

    //route pour récupérer tous les patients en GET
    patientExp.get("/getAllPatients", (req, res) => {
        let patient = new Patient("bli", "bla", "blu", "bly", "blo", "ble", "tel", "pat");
        mapPatient.set("blzsdbfvfhjdk", patient);
        res.json({"coucou" : "coucou"});
    });

    //route pour supprimer un patient via son id en POST
    patientExp.delete("/removePatient", (req, res) => {
        res.json(removePatient(req.query.secuId));
    });

    return patientExp;
}

//router pour les nurses
export function getRouterNurseRestAPI() {
    let express = require("express");
    let nurseExp = new express.Router();

    //route pour ajouter une nurse en POST
    nurseExp.post("/addNurse", (req, res) => {
        const N: Nurse = addNurse(req.body.name, req.body.forename, req.body.address, req.body.id);
        if (req.body.name === undefined || req.body.forename === undefined || req.body.address === undefined || 
            req.body.id === undefined) {
            res.write("Attributes undefined !");
        }
        res.json(N.toJSON());
    });

    //route pour récupérer les informations d'une nurse via son id en GET
    nurseExp.get("/getNurse", (req, res) => {
        res.json(getNurseFromId(req.query.id));
    });

    //route pour récupérer toutes les nurses en GET
    nurseExp.get("/getAllNurses", (req, res) => {
        res.json(getAllNurses().values());
    });

    //route pour supprimer une nurse via son id en POST
    nurseExp.delete("/removeNurse", (req, res) => {
        res.json(removeNurseFromId(req.query.id));
    });

    return nurseExp;
}
