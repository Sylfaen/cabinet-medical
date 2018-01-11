import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

	datajson = require('../../assets/data.json');
	patients = this.datajson.cabinet.patients;
	nurses = this.datajson.cabinet.nurses;

	constructor() {
	}

	ngOnInit() {
	}

	patientOfNurse(id1, id2) {
		return (id1 === id2);
	}
}
