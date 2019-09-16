import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vehicle } from './vehicle.model';
import { VehicleActions, VehicleActionTypes } from './vehicle.actions';

export const vehiclesFeatureKey = 'vehicles';

export interface State extends EntityState<Vehicle> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: VehicleActions
): State {
  switch (action.type) {
    case VehicleActionTypes.AddVehicle: {
      console.log('doing the add');
      return adapter.addOne(action.payload.vehicle, state);
    }

    case VehicleActionTypes.UpsertVehicle: {
      return adapter.upsertOne(action.payload.vehicle, state);
    }

    case VehicleActionTypes.AddVehicles: {
      return adapter.addMany(action.payload.vehicles, state);
    }

    case VehicleActionTypes.UpsertVehicles: {
      return adapter.upsertMany(action.payload.vehicles, state);
    }

    case VehicleActionTypes.UpdateVehicle: {
      return adapter.updateOne(action.payload.vehicle, state);
    }

    case VehicleActionTypes.UpdateVehicles: {
      return adapter.updateMany(action.payload.vehicles, state);
    }

    case VehicleActionTypes.DeleteVehicle: {
      return adapter.removeOne(action.payload.id, state);
    }

    case VehicleActionTypes.DeleteVehicles: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case VehicleActionTypes.LoadVehicles: {
      return adapter.addAll(action.payload.vehicles, state);
    }

    case VehicleActionTypes.ClearVehicles: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
