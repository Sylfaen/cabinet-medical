"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personne_1 = require("./Personne");
class Infirmier extends Personne_1.Personne {
    constructor(nom, prenom, adresse, id, patientsSSN) {
        super(nom, prenom, adresse);
        this.id = id;
        this.patientsSSN = patientsSSN;
    }
    getId() {
        return this.id;
    }
    getPatientsSSN() {
        return this.patientsSSN;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { id: this.getId(), patientsSSN: this.getPatientsSSN() });
    }
}
const mapInfirmiers = new Map();
function getNewInfirmier(nom, prenom, adresse, id, patientsSSN) {
    const I = new Infirmier(nom, prenom, adresse, id, patientsSSN);
    mapInfirmiers.set(I.getId(), I);
    return I;
}
exports.getNewInfirmier = getNewInfirmier;
function getInfirmierFromId(id) {
    return mapInfirmiers.get(id);
}
exports.getInfirmierFromId = getInfirmierFromId;
function getInfirmiers() {
    return mapInfirmiers;
}
exports.getInfirmiers = getInfirmiers;
function addOrUpdateInfirmier(i) {
    mapInfirmiers.set(i.getNumSecuriteSociale(), i);
}
exports.addOrUpdateInfirmier = addOrUpdateInfirmier;
function removeInfirmierFromId(id) {
    return mapInfirmiers.delete(id);
}
exports.removeInfirmierFromId = removeInfirmierFromId;
/*export function getRouterInfirmierRestApi(): express.Router {
    const router = new express.Router();

    // /home
    router.get('/', (req, res) => {
        // res.json reponse sous le format tableau
        res.json( {message: "Il va falloir implémenter tout ça... "+" Bon chance"} );
        // res.json( {message: "dataPath: "+dataPath} );
    });

    // /test
    router.get('/test', (req, res) => {
        console.log('fuuuuuuuuu');
        res.end("Ok, tout va bien avec /test");
    });

    // /testParam
    router.get("/testParams", (req,res) => {

        if(req.query.nom === undefined) {        // requete avec le parametre nommé "nom"
            res.status(400); // changement du status de la requete
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            // res.charset="UTF-8"; // marche pas

            res.end("Vous devez spécifier 1 nom !");
        } else {
            for (let att in req.query) {
                //res.write(${att}:${req.query[att]}\n);
            }
            res.end();
        }
    });
    return router;
}

const subjectNurseUpdated = new Subject<Infirmier>();
const subjectNurseRemoved = new Subject<Infirmier>();

export const obsInfirmierUpdated = subjectNurseUpdated.asObservable();
export const obsInfirmierRemoved = subjectNurseRemoved.asObservable();

*/ 
