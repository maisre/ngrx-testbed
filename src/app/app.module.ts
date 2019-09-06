import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { Ng2CompleterModule } from "ng2-completer";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    VehicleComponent,
    AssignmentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    Ng2CompleterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
