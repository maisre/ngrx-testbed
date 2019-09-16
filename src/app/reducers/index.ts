import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as camerReducer } from '../camera.reducer';
import {reducer as vehicleReducer } from '../vehicle.reducer';


export interface State {

}

export const reducers: ActionReducerMap<State> = {
  cameras: camerReducer,
  vehicles: vehicleReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
