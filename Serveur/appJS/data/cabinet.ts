import * as express from "express";

export interface CabinetJSON {
    name : string;
    adress : string;
    img : string;
    tel : string;
}

export class Cabinet {
    constructor (private name: string, private adress: string, private img: string, private tel: string) {}

    getName(): string {
       return this.name;
    }

    getAdress(): string {
       return this.adress;
    }

    getImg(): string {
       return this.img;
    }

    getTel(): string {
       return this.tel;
    }

    toJSON(): CabinetJSON {
        return {
            name : this.getName(),
            adress : this.getAdress(),
            img : this.getImg(),
            tel : this.getTel()
        };
    }
}

const mapCabinet = new Map<string, Cabinet>();

export function getNewCabinet(name: string,  adress: string, img: string, tel: string): Cabinet {
    const C = new Cabinet(name, adress, img, tel);
    mapCabinet.set(C.getName(), C);
    return C;
}

export function getCabinetFromName(name: string): Cabinet {
    return mapCabinet.get(name);
}

export function getAllCabinets(): any {
    mapCabinet.forEach(function(c: Cabinet) {
        c.toJSON();
    });
}

export function removeCabinetFromName(name: string): boolean {
    return mapCabinet.delete(name);
}

export function getRouterCabinetRestAPI(): express.Router {
    const router: express.Router = express.Router();

    router.post("/addCabinet", (req, res) => {
        const C: Cabinet = getNewCabinet(req.body.name, req.body.adress, req.body.img, req.body.tel);
        if (req.body.name === undefined || req.body.img === undefined || req.body.adress === undefined || req.body.tel === undefined) {
            res.write("Attributes undefined !");
        }
        res.json(N.toJSON());
    });

    router.get("/getCabinet", (req, res) => {
        res.json(getCabinetFromName(req.query.name));
    });

    router.get("/getAllCabinets", (req, res) => {
        res.json(getAllCabinets());
    });

    router.delete("/removeCabinet", (req, res) => {
        res.json(removeCabinetFromName(req.query.name));
    });

    return router;
}