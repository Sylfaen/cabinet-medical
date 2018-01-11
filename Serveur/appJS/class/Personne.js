"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Personne {
    //constructeur
    constructor(name, firstname, address) {
        this.name = name;
        this.firstname = firstname;
        this.address = address;
    }
    //partie getters
    getName() {
        return this.name;
    }
    getFirstname() {
        return this.firstname;
    }
    getAddress() {
        return this.address;
    }
    //retourne l'objet au format JSON
    toJSON() {
        return {
            name: this.getName(),
            firstname: this.getFirstname(),
            address: this.getAddress()
        };
    }
}
exports.Personne = Personne;
