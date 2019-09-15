import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { CameraAssignment } from 'src/models/CameraAssignment';
import { Subscription } from 'rxjs';
import { VehicleService } from '../vehicle.service';
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
  private vehicles: Vehicle[] = [];
  private assignmentSub: Subscription;
  private vehSub: Subscription;
  private camSub: Subscription;
  private selectedVehID: number = -1;
  private selectedCamID: number = -1;
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
    private vehicleService: VehicleService,
    private completerService: CompleterService) { 
    }

  ngOnInit() {
    this.FilterChange();
  }

  ngOnDestroy(){
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

  }

  DeleteAssignment(id: number){
  }

  FilterChange(){
    this.filteredAssignments = this.CameraAssignments.filter(a => {
      let containsCameraString = a.CameraDeviceNo.toLowerCase().includes(this.cameraFilter.toLowerCase());
      let containsVehicleString = a.VehicleName.toLowerCase().includes(this.vehicleFilter.toLowerCase());

      return containsCameraString && containsVehicleString;
    })

  }
}
