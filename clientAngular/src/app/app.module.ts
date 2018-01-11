import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { NurseComponent } from './nurse/nurse.component';
import { CabinetComponent } from './cabinet/cabinet-medical.component';
import { PatientComponent } from './patient/patient.component';
import { CabinetMedicalService } from './cabinet/cabinet-medical.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    NurseComponent,
    CabinetComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
       apiKey: "AIzaSyDuQa9mwIwQGvd_0paYdG4HJfIF1QuXrm0"
      })
  ],
  providers: [CabinetMedicalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
