import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CameraAssignment } from './camera-assignment.model';

export enum CameraAssignmentActionTypes {
  LoadCameraAssignments = '[CameraAssignment] Load CameraAssignments',
  AddCameraAssignment = '[CameraAssignment] Add CameraAssignment',
  UpsertCameraAssignment = '[CameraAssignment] Upsert CameraAssignment',
  AddCameraAssignments = '[CameraAssignment] Add CameraAssignments',
  UpsertCameraAssignments = '[CameraAssignment] Upsert CameraAssignments',
  UpdateCameraAssignment = '[CameraAssignment] Update CameraAssignment',
  UpdateCameraAssignments = '[CameraAssignment] Update CameraAssignments',
  DeleteCameraAssignment = '[CameraAssignment] Delete CameraAssignment',
  DeleteCameraAssignments = '[CameraAssignment] Delete CameraAssignments',
  ClearCameraAssignments = '[CameraAssignment] Clear CameraAssignments'
}

export class LoadCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.LoadCameraAssignments;

  constructor(public payload: { cameraAssignments: CameraAssignment[] }) {}
}

export class AddCameraAssignment implements Action {
  readonly type = CameraAssignmentActionTypes.AddCameraAssignment;

  constructor(public payload: { cameraAssignment: CameraAssignment }) {}
}

export class UpsertCameraAssignment implements Action {
  readonly type = CameraAssignmentActionTypes.UpsertCameraAssignment;

  constructor(public payload: { cameraAssignment: CameraAssignment }) {}
}

export class AddCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.AddCameraAssignments;

  constructor(public payload: { cameraAssignments: CameraAssignment[] }) {}
}

export class UpsertCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.UpsertCameraAssignments;

  constructor(public payload: { cameraAssignments: CameraAssignment[] }) {}
}

export class UpdateCameraAssignment implements Action {
  readonly type = CameraAssignmentActionTypes.UpdateCameraAssignment;

  constructor(public payload: { cameraAssignment: Update<CameraAssignment> }) {}
}

export class UpdateCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.UpdateCameraAssignments;

  constructor(public payload: { cameraAssignments: Update<CameraAssignment>[] }) {}
}

export class DeleteCameraAssignment implements Action {
  readonly type = CameraAssignmentActionTypes.DeleteCameraAssignment;

  constructor(public payload: { id: string }) {}
}

export class DeleteCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.DeleteCameraAssignments;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCameraAssignments implements Action {
  readonly type = CameraAssignmentActionTypes.ClearCameraAssignments;
}

export type CameraAssignmentActions =
 LoadCameraAssignments
 | AddCameraAssignment
 | UpsertCameraAssignment
 | AddCameraAssignments
 | UpsertCameraAssignments
 | UpdateCameraAssignment
 | UpdateCameraAssignments
 | DeleteCameraAssignment
 | DeleteCameraAssignments
 | ClearCameraAssignments;
