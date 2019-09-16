import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CameraAssignment } from './camera-assignment.model';
import { CameraAssignmentActions, CameraAssignmentActionTypes } from './camera-assignment.actions';

export const cameraAssignmentsFeatureKey = 'cameraAssignments';

export interface State extends EntityState<CameraAssignment> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CameraAssignment> = createEntityAdapter<CameraAssignment>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CameraAssignmentActions
): State {
  switch (action.type) {
    case CameraAssignmentActionTypes.AddCameraAssignment: {
      return adapter.addOne(action.payload.cameraAssignment, state);
    }

    case CameraAssignmentActionTypes.UpsertCameraAssignment: {
      return adapter.upsertOne(action.payload.cameraAssignment, state);
    }

    case CameraAssignmentActionTypes.AddCameraAssignments: {
      return adapter.addMany(action.payload.cameraAssignments, state);
    }

    case CameraAssignmentActionTypes.UpsertCameraAssignments: {
      return adapter.upsertMany(action.payload.cameraAssignments, state);
    }

    case CameraAssignmentActionTypes.UpdateCameraAssignment: {
      return adapter.updateOne(action.payload.cameraAssignment, state);
    }

    case CameraAssignmentActionTypes.UpdateCameraAssignments: {
      return adapter.updateMany(action.payload.cameraAssignments, state);
    }

    case CameraAssignmentActionTypes.DeleteCameraAssignment: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CameraAssignmentActionTypes.DeleteCameraAssignments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CameraAssignmentActionTypes.LoadCameraAssignments: {
      return adapter.addAll(action.payload.cameraAssignments, state);
    }

    case CameraAssignmentActionTypes.ClearCameraAssignments: {
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
