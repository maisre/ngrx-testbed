import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Camera } from './camera.model';
import { CameraActions, CameraActionTypes } from './camera.actions';

export const camerasFeatureKey = 'cameras';

export interface State extends EntityState<Camera> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Camera> = createEntityAdapter<Camera>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CameraActions
): State {
  
  console.log('got a call in the reducer', action);
  switch (action.type) {
    case CameraActionTypes.AddCamera: {
      console.log('in the add cameras', state);
      return adapter.addOne(action.payload.camera, state);
    }

    case CameraActionTypes.UpsertCamera: {
      return adapter.upsertOne(action.payload.camera, state);
    }

    case CameraActionTypes.AddCameras: {
      return adapter.addMany(action.payload.cameras, state);
    }

    case CameraActionTypes.UpsertCameras: {
      return adapter.upsertMany(action.payload.cameras, state);
    }

    case CameraActionTypes.UpdateCamera: {
      return adapter.updateOne(action.payload.camera, state);
    }

    case CameraActionTypes.UpdateCameras: {
      return adapter.updateMany(action.payload.cameras, state);
    }

    case CameraActionTypes.DeleteCamera: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CameraActionTypes.DeleteCameras: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CameraActionTypes.LoadCameras: {
      return adapter.addAll(action.payload.cameras, state);
    }

    case CameraActionTypes.ClearCameras: {
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
