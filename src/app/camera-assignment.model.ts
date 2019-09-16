export interface CameraAssignment {
  id: number;
  cameraId: number;
  vehicleId: number;
  dateCreated: Date;
  deleted: boolean;
}


export class CameraAssignmentFull {    
  public id: number;
  public cameraId: number;
  public cameraDeviceNo: string;
  public vehicleId: number;
  public vehicleName: string;
  public dateCreated: Date;
  public deleted: boolean;
}