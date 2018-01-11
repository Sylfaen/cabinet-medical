import { Component, OnInit } from '@angular/core';
import { CabinetMedicalService } from './cabinet-medical.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet-medical.component.html',
  styleUrls: ['./cabinet-medical.component.css']
})
export class CabinetComponent implements OnInit {

	/*myjsondata;
	cabinet: CabinetMedicalService;*/

  constructor () {
	  /*this.cabinet.load().then((data) => {
      console.log("what is in the data ", data);
      this.myjsondata = data;
    });*/
  }

  ngOnInit() {

  }

}
