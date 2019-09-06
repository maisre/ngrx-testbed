import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { CameraAssignment } from 'src/models/CameraAssignment';
import { Subscription } from 'rxjs';
import { CameraService } from '../camera.service';
import { VehicleService } from '../vehicle.service';
import { Camera } from 'src/models/Camera';
import { CompleterData, CompleterService } from 'ng2-completer';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Vehicle } from 'src/models/Vehicle';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.less']
})
export class AssignmentComponent implements OnInit, OnDestroy {

  private CameraAssignments: CameraAssignment[] = [];
  private filteredAssignments: CameraAssignment[] = [];
  private cameras: Camera[] = [];
  private vehicles: Vehicle[] = [];
  private assignmentSub: Subscription;
  private vehSub: Subscription;
  private camSub: Subscription;
  private selectedVehID: number = -1;
  private selectedCamID: number = -1;
  private selectedCamera: Camera;
  private selectedVehicle: Vehicle;
  private showCameraError: boolean = false;
  private showVehicleError: boolean = false;
  private disableAdd: boolean = true;
  private cameraFilter: string = '';
  private vehicleFilter: string = '';


  protected cameraData: CompleterData;
  protected vehicleData: CompleterData;
  constructor(
    private assignmentSerivce: AssignmentService, 
    private cameraService: CameraService, 
    private vehicleService: VehicleService,
    private completerService: CompleterService) { 
    }

  ngOnInit() {
    this.assignmentSub = this.assignmentSerivce.assignments.subscribe(assignments => {
      this.CameraAssignments = assignments;
      this.FilterChange();
    });
    this.vehSub = this.vehicleService.vehicles.subscribe(vehicles => {
      this.vehicles = vehicles;
      this.vehicleData = this.completerService.local(this.vehicles, 'Name', 'Name');
    });
    this.camSub = this.cameraService.cameras.subscribe(cams => {
      this.cameras = cams;
      this.cameraData = this.completerService.local(this.cameras, 'DeviceNo', 'DeviceNo');
    });
    this.FilterChange();
  }

  ngOnDestroy(){
    this.assignmentSub.unsubscribe();
    this.vehSub.unsubscribe();
    this.camSub.unsubscribe();
  }

  onVehicleSelect(event){
    let error = false;
    this.selectedVehID = -1;
    if(event && event.originalObject){
      this.selectedVehID = event.originalObject.ID;
      this.CameraAssignments.forEach(a => {
        if(a.VehicleId == this.selectedVehID && a.Deleted == false)
          error = true;
      })
    }

    this.showVehicleError = error;
    this.ValidateInput();
  }
  
  onCameraSelect(event){
    let error = false;
    this.selectedCamID = -1;
    if(event && event.originalObject){
      this.selectedCamID = event.originalObject.ID;
      this.CameraAssignments.forEach(a => {
        if(a.CameraId == this.selectedCamID && a.Deleted == false)
          error = true;
      })
    }
    
    this.showCameraError = error;
    this.ValidateInput();
  }

  ValidateInput(){
    if(this.showCameraError || this.showVehicleError || this.selectedCamID == -1 || this.selectedVehID == -1)
      this.disableAdd = true;
    else
      this.disableAdd = false;
  }

  AddAssignment(){
    this.assignmentSerivce.AddAssignment(this.selectedCamID, this.selectedVehID);
    this.selectedCamID = -1;
    this.selectedVehID = -1;
    this.selectedCamera = undefined;
    this.selectedVehicle = undefined;
    this.disableAdd = true;
  }

  DeleteAssignment(id: number){
    this.assignmentSerivce.DeleteAssignment(id);
  }

  FilterChange(){
    this.filteredAssignments = this.CameraAssignments.filter(a => {
      let containsCameraString = a.CameraDeviceNo.toLowerCase().includes(this.cameraFilter.toLowerCase());
      let containsVehicleString = a.VehicleName.toLowerCase().includes(this.vehicleFilter.toLowerCase());

      return containsCameraString && containsVehicleString;
    })

  }
}
