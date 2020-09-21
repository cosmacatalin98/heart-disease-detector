import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './auth-guard.service';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { ScientistPanelComponent } from './scientist-panel/scientist-panel.component';
import { MedicalRecordService } from './medical-record.service';
import { DiagnosisService } from './diagnosis.service';
import { ModelParametersService } from "./model-parameters.service";
import { TestTrainService } from './test-train.service';
import { AccuracyService } from './accuracy.service';
import { KFoldTrainService } from './k-fold-train.service';

const appRoutes: Routes = [
      { path: "", component: LogInComponent},
      { path: "scientistpage", component: ScientistPanelComponent},
      { path: "doctorpage", component: DoctorPanelComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent, TopBarComponent, LogInComponent, DoctorPanelComponent, ScientistPanelComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthGuardService, MedicalRecordService, DiagnosisService, ModelParametersService, TestTrainService, AccuracyService, KFoldTrainService]
})
export class AppModule { }
