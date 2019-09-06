import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { CameraComponent } from './camera/camera.component';
import { VehicleComponent } from './vehicle/vehicle.component';


const routes: Routes = [
  {path: '', children: [
    {
      path:'',
      component: AssignmentComponent,
    },
    {
      path: 'camera',
      component: CameraComponent
    },
    {
      path: 'vehicle',
      component: VehicleComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
