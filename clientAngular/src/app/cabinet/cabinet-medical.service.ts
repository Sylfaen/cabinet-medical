import { Injectable } from '@angular/core';
import {Http, HttpModule} from '@angular/http';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import{SecretaryComponent} from '../secretary/secretary.component';
import {MapsAPILoader} from "@agm/core";

@Injectable()
export class CabinetMedicalService {
    
    //data;
    private Pgapi: Promise<any>;
    private geocoder;

    /*constructor(private http: Http, mapsAPILoader: MapsAPILoader) { 
        this.Pgapi = mapsAPILoader.load().then(() => {
        console.log('google script loaded');
        this.geocoder = new google.maps.Geocoder();
        } );
    }

      private getLatLngFor( adressables: {adresse: Adresse}[] ) {
      adressables = adressables.slice(); // Copie pour éviter problèmes récursions
      this.Pgapi.then( () => {
       if (adressables.length) {
         const itemWithAdress = adressables.pop();
         const A = itemWithAdress.adresse;
         const address = `${A.numéro} ${A.rue}, ${A.codePostal} ${A.ville}`;
         this.geocoder.geocode({address}, (res, status) => {
           // console.log(itemWithAdress, "=>", status, res);
           if (status === google.maps.GeocoderStatus.OK) {
             const place = res[0].geometry.location;
             itemWithAdress.adresse.lat = place.lat();
             itemWithAdress.adresse.lng = place.lng();
             console.log( itemWithAdress.adresse );
           }
           switch (status) {
             case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
               patients.push(itemWithAdress);
               this.getLatLngFor(patients);
               break;
             default:
               this.getLatLngFor(patients);
           }
         });
       }
     });
    }*/


    /*load() {
        console.log('json called');
        return new Promise(resolve => {
            this.http.get('assets/data.json').subscribe(response => {
                this.data = response.json();
                resolve(this.data);
            });
        });
    }*/
}
  