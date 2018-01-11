import {PersonneJSON} from "./persJSON";

export abstract class Personne {

    //attributs de la classe Personne (nom, prénom, adresse)
    name: string;
    firstname: string;
    address: string;

    //constructeur
    constructor(name: string, firstname: string, address: string) {
        this.name = name;
        this.firstname = firstname;
        this.address = address;
    }

    //partie getters
    getName(): string {
        return this.name;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getAddress(): string {
        return this.address;
    }

    //retourne l'objet au format JSON
    toJSON(): PersonneJSON {
        return {
            name : this.getName(),
            firstname : this.getFirstname(),
            address : this.getAddress()
        };
    }
}