import { State as CameraState } from './camera.reducer'
import { State as VehicleState } from './vehicle.reducer'

export interface AppState {
    cameras: CameraState;
    vehicles: VehicleState;
  }