import { State as CameraState } from './camera.reducer'
import { State as VehicleState } from './vehicle.reducer'
import { State as AssignmentState } from './camera-assignment.reducer';

export interface AppState {
    cameras: CameraState;
    vehicles: VehicleState;
    assignments: AssignmentState;
  }