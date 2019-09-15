import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as camerReducer } from '../camera.reducer';


export interface State {

}

export const reducers: ActionReducerMap<State> = {
  cameras: camerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
