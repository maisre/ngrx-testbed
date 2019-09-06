import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CameraService } from './camera.service';
import { VehicleService } from './vehicle.service';
import { Camera } from 'src/models/Camera';
import { CameraAssignmentEntity, CameraAssignment } from 'src/models/CameraAssignment';
import { Vehicle } from 'src/models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private nextAssignmentID: number = 3;

  private assignmentEntities: CameraAssignmentEntity[] = [
    {ID: 1, CameraId: 1, VehicleId: 1, DateCreated: new Date(), Deleted: false},
    {ID: 2, CameraId: 2, VehicleId: 2, DateCreated: new Date(), Deleted: true}
  ];
  private CameraAssignments: CameraAssignment[] = [];
  private assignmentObservers: any[] = [];

  public assignments: Observable<CameraAssignment[]>;
  private cameraSub: Subscription;
  private vehicleSub: Subscription;
  private cameras: Camera[] = [];
  private vehicles: Vehicle[] = [];
  
  constructor(private cameraService: CameraService, private vehicleService: VehicleService) {
    this.cameraSub = this.cameraService.cameras.subscribe(cams => {
      this.cameras = cams;
      this.UpdateAssignments();
    })

    this.vehicleSub = this.vehicleService.vehicles.subscribe(vehs => {
      this.vehicles = vehs;
      this.UpdateAssignments();
    })

    this.assignments = Observable.create(obs => {
      this.assignmentObservers.push(obs);
      obs.next(this.CameraAssignments);
    })
  }

  UpdateAssignments() {
    this.CameraAssignments = [];
    this.assignmentEntities.forEach(entity => {
      let filledAssignment = new CameraAssignment();
      filledAssignment = {...filledAssignment, ...entity};
      filledAssignment.CameraDeviceNo = this.GetDeviceNo(filledAssignment.CameraId);
      filledAssignment.VehicleName = this.GetVehName(filledAssignment.VehicleId);
      this.CameraAssignments.push(filledAssignment);
    });
    
    this.assignmentObservers.forEach(obs => obs.next(this.CameraAssignments));

  }

  GetDeviceNo(camID: number): string{
    let deviceNo = 'Unknown Camera';
    this.cameras.forEach(cam => {
      if(cam.ID == camID)
        deviceNo = cam.DeviceNo;
    })

    return deviceNo;
  }

  GetVehName(vehID: number): string{
    let vehName = 'Unknown Vehicle';
    this.vehicles.forEach(veh => {
      if(veh.ID == vehID)
      vehName = veh.Name;
    })

    return vehName;

  }

  AddAssignment(cameraID: number, vehicleID: number){
    let entity = new CameraAssignmentEntity();
    entity.CameraId = cameraID;
    entity.VehicleId = vehicleID;
    entity.DateCreated = new Date();
    entity.ID = this.nextAssignmentID;
    entity.Deleted = false;
    this.nextAssignmentID++;
    this.assignmentEntities.push(entity);
    this.UpdateAssignments();
  }

  DeleteAssignment(id:number){
    this.assignmentEntities.forEach(a => {
      if(a.ID == id){
        a.Deleted = true;
      }
    })

    this.UpdateAssignments();
  }
}
