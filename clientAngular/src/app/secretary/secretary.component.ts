import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

	datajson = require('../../assets/data.json');
	nurses = this.datajson.cabinet.nurses;

	constructor() { }

	ngOnInit() {
	}

}
