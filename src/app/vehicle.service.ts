import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/models/Vehicle';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private vehicleObservers: any[] = [];
  private nextVehID: number = 4;
  private allVehicles: Vehicle[] = [
    {ID: 1, Name: 'Terberg'},
    {ID: 2, Name: 'Peterbilt'},
    {ID: 3, Name: 'Transit'}
  ];

  public vehicles: Observable<Vehicle[]>;

  constructor() { 
    this.vehicles = Observable.create(obs => {
      this.vehicleObservers.push(obs);
      obs.next(this.allVehicles);
    })
  }

  AddVehicle(vehName: string){
    
    let newVehilce = new Vehicle();
    newVehilce.ID = this.nextVehID;
    this.nextVehID++;
    newVehilce.Name = vehName;
    this.allVehicles.push(newVehilce);
    this.vehicleObservers.forEach(obs => obs.next(this.allVehicles));
  }

  VehicleExists(name: string): boolean{
    let exists = false;
    this.allVehicles.forEach(veh => {
      if(veh.Name.toLowerCase() == name.toLowerCase()){
        exists = true;
      }
    })
    return exists;
  }
}
