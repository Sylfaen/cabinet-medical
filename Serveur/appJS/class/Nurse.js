"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personne_1 = require("./Personne");
const Subject_1 = require("rxjs/Subject");
class Nurse extends Personne_1.Personne {
    //constructeur
    constructor(name, firstname, address, id) {
        super(name, firstname, address);
        this.id = id;
    }
    //partie getters
    getId() {
        return this.id;
    }
    //retourne l'objet au format JSON
    toJSON() {
        return Object.assign({}, super.toJSON(), { id: this.getId() });
    }
}
exports.Nurse = Nurse;
//initalisation de la map contenant tous les nurses
exports.mapNurse = new Map();
//initialisation des sujets et observables pour l'ajout & la suppression (pour communiquer avec Angular)
const addNurseSubject = new Subject_1.Subject();
exports.addNurseObservable = addNurseSubject.asObservable();
const removeNurseSubject = new Subject_1.Subject();
exports.removeNurseObservable = removeNurseSubject.asObservable();
//fonction pour ajouter une nurse dans la map et activer l'observable d'ajout
function addNurse(name, firstname, address, id) {
    const N = new Nurse(name, firstname, address, id);
    exports.mapNurse.set(N.getId(), N);
    addNurseSubject.next(N);
    return N;
}
exports.addNurse = addNurse;
//fonction pour ajouter une nurse dans la map à partir de la DB
function addNurseDB(name, firstname, address, id) {
    const N = new Nurse(name, firstname, address, id);
    exports.mapNurse.set(N.getId(), N);
    return N;
}
exports.addNurseDB = addNurseDB;
//fonction pour récupérer la nurse dans la map correspondante à l'id
function getNurseFromId(id) {
    return exports.mapNurse.get(id);
}
exports.getNurseFromId = getNurseFromId;
//fonction qui retourne la map de nurses
function getAllNurses() {
    return exports.mapNurse;
}
exports.getAllNurses = getAllNurses;
//fonction pour supprimer une nurse dans la map et activer l'observable de suppression
function removeNurseFromId(id) {
    const N = getNurseFromId(id);
    removeNurseSubject.next(N);
    return exports.mapNurse.delete(id);
}
exports.removeNurseFromId = removeNurseFromId;
//fonction pour mettre à jour une nurse dans la map et activer les observables d'ajout et suppression
function updateNurse(name, firstname, address, id) {
    const N = getNurseFromId(id);
    const updN = new Nurse(name, firstname, address, id);
    exports.mapNurse.set(id, updN);
    removeNurseSubject.next(N);
    addNurseSubject.next(N);
    return N;
}
exports.updateNurse = updateNurse;
