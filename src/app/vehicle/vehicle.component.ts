import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { Vehicle } from '../vehicle.model';
import { selectAll } from '../vehicle.reducer';
import { AddVehicle } from '../vehicle.actions';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.less']
})
export class VehicleComponent {

  vehicles: Vehicle[];
  id: number;
  newVehicleName: string = '';
  
  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(state => selectAll(state.vehicles))
    ).subscribe(v => {
      this.vehicles = v;
      this.id = this.vehicles.length;
    });
   }


  AddVehicle() {
    this.store.dispatch(new AddVehicle({vehicle: {id: this.id, name: this.newVehicleName}}));
    this.id++;
    this.newVehicleName = '';
  }
}
