import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet/cabinet-medical.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { NurseComponent} from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';


const routes: Routes = [
  { path: 'secretary', component: SecretaryComponent },
  { path: 'nurse', component: NurseComponent },
  { path: '', component: CabinetComponent },
  { path: 'patient', component: PatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }