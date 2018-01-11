import "module-alias/register";
import * as http from "http";
import * as https from "https";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as fs from "fs-extra";
import {getRouterNurseRestAPI, getRouterPatientRestAPI} from "./router";
import {loadDB} from "./mongo";

const app: express.Application = express();

//connexion au serveur créé sur le port 8080 en http et sur le port 8443 en https
const serverHTTP = http.createServer(app);
const portHTTP = process.env.PORT || 8080;
serverHTTP.listen(portHTTP, () => {
    console.log(`HTTP server running on port ${portHTTP}.`);
});
const portHTTPS = 8443;
const TLS_SSL =	{key : fs.readFileSync( path.join("./app/MM.pem") ), cert: fs.readFileSync( path.join("./app/certificat.pem") )};
const serverHTTPS = https.createServer(TLS_SSL, app);
serverHTTPS.listen(portHTTPS, () => {
    console.log(`HTTPS server running on port ${portHTTPS}. `);
});

//route principale
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
   loadDB();
   res.json( {message: "Il va falloir implémenter tout ça..."} );
});

//routes des datas
const datapath = path.join(__dirname, "../app/data");
console.log(datapath);

//routes de test
app.use("/data", express.static(datapath));
app.get("/test", (req, res) => {
    console.log("methode get /test");
    res.end("OK tout va bien ...");
});
app.get("/testParams", ( req, res) => {
    if (req.query.nom === undefined) {
        res.status(400);
        res.setHeader("Content-type", "text/html; charset=UTF-8");
        res.end("Nom : Vous devez spécifier un nom\nPrénom : " + req.query.prenom);
    }
    else if ( req.query.prenom === undefined) {
        res.status(400);
        res.setHeader("Content-type", "text/html; charset=UTF-8");
        res.end("Nom : " + req.query.nom + "\nPrénom : Vous devez spécifier un prénom");
    }
    else {
        res.end(req.query.nom + " " + req.query.prenom);
    }
});
app.post("/testPost", (req, res) => {
    console.log(req.body.prenom);
    if (req.body.nom === undefined) {
        res.status(400);
        res.send("Nom : Vous devez spécifier un nom");
    }
    else if ( req.body.prenom === undefined) {
        res.status(400);
        res.end("Prénom : Vous devez spécifier un prénom");
    }
    else {
        res.send(req.body.nom + " " + req.body.prenom);
    }
    res.end();
});

//routes vers les patients et nurses
app.use("/nurse", getRouterNurseRestAPI());
app.use("/patient", getRouterPatientRestAPI());