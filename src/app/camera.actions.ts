import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Camera } from './camera.model';

export enum CameraActionTypes {
  LoadCameras = '[Camera] Load Cameras',
  AddCamera = '[Camera] Add Camera',
  UpsertCamera = '[Camera] Upsert Camera',
  AddCameras = '[Camera] Add Cameras',
  UpsertCameras = '[Camera] Upsert Cameras',
  UpdateCamera = '[Camera] Update Camera',
  UpdateCameras = '[Camera] Update Cameras',
  DeleteCamera = '[Camera] Delete Camera',
  DeleteCameras = '[Camera] Delete Cameras',
  ClearCameras = '[Camera] Clear Cameras'
}

export class LoadCameras implements Action {
  readonly type = CameraActionTypes.LoadCameras;

  constructor(public payload: { cameras: Camera[] }) {}
}

export class AddCamera implements Action {
  readonly type = CameraActionTypes.AddCamera;

  constructor(public payload: { camera: Camera }) {}
}

export class UpsertCamera implements Action {
  readonly type = CameraActionTypes.UpsertCamera;

  constructor(public payload: { camera: Camera }) {}
}

export class AddCameras implements Action {
  readonly type = CameraActionTypes.AddCameras;

  constructor(public payload: { cameras: Camera[] }) {}
}

export class UpsertCameras implements Action {
  readonly type = CameraActionTypes.UpsertCameras;

  constructor(public payload: { cameras: Camera[] }) {}
}

export class UpdateCamera implements Action {
  readonly type = CameraActionTypes.UpdateCamera;

  constructor(public payload: { camera: Update<Camera> }) {}
}

export class UpdateCameras implements Action {
  readonly type = CameraActionTypes.UpdateCameras;

  constructor(public payload: { cameras: Update<Camera>[] }) {}
}

export class DeleteCamera implements Action {
  readonly type = CameraActionTypes.DeleteCamera;

  constructor(public payload: { id: string }) {}
}

export class DeleteCameras implements Action {
  readonly type = CameraActionTypes.DeleteCameras;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCameras implements Action {
  readonly type = CameraActionTypes.ClearCameras;
}

export type CameraActions =
 LoadCameras
 | AddCamera
 | UpsertCamera
 | AddCameras
 | UpsertCameras
 | UpdateCamera
 | UpdateCameras
 | DeleteCamera
 | DeleteCameras
 | ClearCameras;
