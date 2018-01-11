"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personne_1 = require("./Personne");
class Patient extends Personne_1.Personne {
    constructor(nom, prenom, adresse, numSecuriteSociale, age, sexe, pathologie) {
        super(nom, prenom, adresse);
        this.numSecuriteSociale = numSecuriteSociale;
        this.age = age;
        this.sexe = sexe;
        this.pathologie = pathologie;
    }
    getNumSecuriteSociale() {
        return this.numSecuriteSociale;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { numSecuriteSociale: this.getNumSecuriteSociale() });
    }
}
const mapPatients = new Map();
function getNewPatient(nom, prenom, adresse, numSecuriteSociale, age, sexe, pathologie) {
    const P = new Patient(nom, prenom, adresse, numSecuriteSociale, age, sexe, pathologie);
    mapPatients.set(P.getNumSecuriteSociale(), P);
    return P;
}
exports.getNewPatient = getNewPatient;
function getPatientFromSocial(numSecuriteSociale) {
    return mapPatients.get(numSecuriteSociale);
}
exports.getPatientFromSocial = getPatientFromSocial;
function getPatients() {
    return mapPatients;
}
exports.getPatients = getPatients;
function addOrUpdatePatient(p) {
    mapPatients.set(p.getNumSecuriteSociale(), p);
}
exports.addOrUpdatePatient = addOrUpdatePatient;
function removePatientFromId(id) {
    return mapPatients.delete(id);
}
exports.removePatientFromId = removePatientFromId;
/*export function getRouterPatientRestApi(): express.Router {
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
}*/
