import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from 'src/models/Vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.less']
})
export class VehicleComponent implements OnInit, OnDestroy {

  public Vehicles: Vehicle[] = [];
  private showError: boolean = false;
  
  public newVehicleName: string = '';
  private vehicleSub: Subscription;
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleSub = this.vehicleService.vehicles.subscribe(vehicles => this.Vehicles = vehicles);
  }

  ngOnDestroy(){
    this.vehicleSub.unsubscribe();
  }
  
  AddVehicle() {
    if(this.vehicleService.VehicleExists(this.newVehicleName)){
      this.showError = true;
      return;
    }
    this.showError = false;
    this.vehicleService.AddVehicle(this.newVehicleName);
    this.newVehicleName = '';
  }
}
