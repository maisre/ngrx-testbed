import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Vehicle } from './vehicle.model';

export enum VehicleActionTypes {
  LoadVehicles = '[Vehicle] Load Vehicles',
  AddVehicle = '[Vehicle] Add Vehicle',
  UpsertVehicle = '[Vehicle] Upsert Vehicle',
  AddVehicles = '[Vehicle] Add Vehicles',
  UpsertVehicles = '[Vehicle] Upsert Vehicles',
  UpdateVehicle = '[Vehicle] Update Vehicle',
  UpdateVehicles = '[Vehicle] Update Vehicles',
  DeleteVehicle = '[Vehicle] Delete Vehicle',
  DeleteVehicles = '[Vehicle] Delete Vehicles',
  ClearVehicles = '[Vehicle] Clear Vehicles'
}

export class LoadVehicles implements Action {
  readonly type = VehicleActionTypes.LoadVehicles;

  constructor(public payload: { vehicles: Vehicle[] }) {}
}

export class AddVehicle implements Action {
  readonly type = VehicleActionTypes.AddVehicle;

  constructor(public payload: { vehicle: Vehicle }) {}
}

export class UpsertVehicle implements Action {
  readonly type = VehicleActionTypes.UpsertVehicle;

  constructor(public payload: { vehicle: Vehicle }) {}
}

export class AddVehicles implements Action {
  readonly type = VehicleActionTypes.AddVehicles;

  constructor(public payload: { vehicles: Vehicle[] }) {}
}

export class UpsertVehicles implements Action {
  readonly type = VehicleActionTypes.UpsertVehicles;

  constructor(public payload: { vehicles: Vehicle[] }) {}
}

export class UpdateVehicle implements Action {
  readonly type = VehicleActionTypes.UpdateVehicle;

  constructor(public payload: { vehicle: Update<Vehicle> }) {}
}

export class UpdateVehicles implements Action {
  readonly type = VehicleActionTypes.UpdateVehicles;

  constructor(public payload: { vehicles: Update<Vehicle>[] }) {}
}

export class DeleteVehicle implements Action {
  readonly type = VehicleActionTypes.DeleteVehicle;

  constructor(public payload: { id: string }) {}
}

export class DeleteVehicles implements Action {
  readonly type = VehicleActionTypes.DeleteVehicles;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearVehicles implements Action {
  readonly type = VehicleActionTypes.ClearVehicles;
}

export type VehicleActions =
 LoadVehicles
 | AddVehicle
 | UpsertVehicle
 | AddVehicles
 | UpsertVehicles
 | UpdateVehicle
 | UpdateVehicles
 | DeleteVehicle
 | DeleteVehicles
 | ClearVehicles;
