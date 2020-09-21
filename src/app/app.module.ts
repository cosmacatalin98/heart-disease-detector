import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { ScientistPanelComponent } from './scientist-panel/scientist-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  { path: "", component: LogInComponent},
  { path: "scientistpage", component: ScientistPanelComponent},
  { path: "doctorpage", component: DoctorPanelComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LogInComponent,
    DoctorPanelComponent,
    ScientistPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
