import {Personne} from "./Personne";
import {NurseJSON} from "./nursJSON";
import {Subject} from "rxjs/Subject";

export class Nurse extends Personne {

    //attributs de la classe Nurse (nom, prénom, adresse (depuis la classe Personne qu'elle étend), id)
    id: string;

    //constructeur
    constructor (name: string, firstname: string, address: string, id: string) {
        super(name, firstname, address);
        this.id = id;
    }

    //partie getters
    getId(): string {
        return this.id;
    }

    //retourne l'objet au format JSON
    toJSON(): NurseJSON {
        return Object.assign({}, super.toJSON(), {id: this.getId()});
    }
}

//initalisation de la map contenant tous les nurses
export const mapNurse = new Map<string, Nurse>();

//initialisation des sujets et observables pour l'ajout & la suppression (pour communiquer avec Angular)
const addNurseSubject = new Subject<Nurse>();
export let addNurseObservable = addNurseSubject.asObservable();
const removeNurseSubject = new Subject<Nurse>();
export let removeNurseObservable = removeNurseSubject.asObservable();

//fonction pour ajouter une nurse dans la map et activer l'observable d'ajout
export function addNurse(name: string, firstname: string, address: string, id: string): Nurse {
    const N = new Nurse(name, firstname, address, id);
    mapNurse.set(N.getId(), N);
    addNurseSubject.next(N);
    return N;
}

//fonction pour ajouter une nurse dans la map à partir de la DB
export function addNurseDB(name: string, firstname: string, address: string, id: string): Nurse {
    const N = new Nurse(name, firstname, address, id);
    mapNurse.set(N.getId(), N);
    return N;
}

//fonction pour récupérer la nurse dans la map correspondante à l'id
export function getNurseFromId(id: string): Nurse {
    return mapNurse.get(id);
}

//fonction qui retourne la map de nurses
export function getAllNurses(): Map<string, Nurse> {
    return mapNurse;
}

//fonction pour supprimer une nurse dans la map et activer l'observable de suppression
export function removeNurseFromId(id: string): boolean {
    const N = getNurseFromId(id);
    removeNurseSubject.next(N);
    return mapNurse.delete(id);
}

//fonction pour mettre à jour une nurse dans la map et activer les observables d'ajout et suppression
export function updateNurse(name: string, firstname: string, address: string, id: string): Nurse {
    const N = getNurseFromId(id);
    const updN = new Nurse(name, firstname, address, id);
    mapNurse.set(id, updN);
    removeNurseSubject.next(N);
    addNurseSubject.next(N);
    return N;
}