import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompleterData, CompleterService } from 'ng2-completer';
import { CameraAssignment } from '../camera-assignment.model';
import { CameraAssignmentFull } from "../CameraAssignmentFull";
import { Vehicle } from '../vehicle.model';
import { AppState } from '../app-state';
import { Store, select } from '@ngrx/store';
import { selectAll as selectAllVehicles } from '../vehicle.reducer';
import { selectAll as selectAllCameras } from '../camera.reducer';
import { selectAll as selectAllAssignmnets } from '../camera-assignment.reducer';
import { AddCameraAssignment } from '../camera-assignment.actions';
import { Camera } from '../camera.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.less']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  

  private CameraAssignments: CameraAssignmentFull[] = [];
  private filteredAssignments: CameraAssignmentFull[] = [];
  private rawAssignments: CameraAssignment[] = [];
  private vehicles: Vehicle[] = [];
  private cameras: Camera[] = [];
  private selectedVehID: number = -1;
  private selectedCamID: number = -1;
  private selectedVehicle: Vehicle;
  private showCameraError: boolean = false;
  private showVehicleError: boolean = false;
  private disableAdd: boolean = true;
  private cameraFilter: string = '';
  private vehicleFilter: string = '';
  private id: number;


  protected cameraData: CompleterData;
  protected vehicleData: CompleterData;

  constructor(
    private completerService: CompleterService,
    private store: Store<AppState>) { 
      this.store.pipe(
        select(state => selectAllCameras(state.cameras)	
      )).subscribe(v => {
        this.cameras = v;
        this.cameraData = this.completerService.local(this.cameras, 'DeviceNo', 'DeviceNo');
        this.ProcessAssignments();
      });
      
      this.store.pipe(
        select(state => selectAllVehicles(state.vehicles)	
      )).subscribe(v => {
        this.vehicles = v;
        this.vehicleData = this.completerService.local(this.vehicles, 'name', 'name');
        this.ProcessAssignments();
      });

      this.store.pipe(
        select(state => selectAllAssignmnets(state.assignments))
      ).subscribe( v => {
        this.rawAssignments = v;
        this.id = v.length;
        this.ProcessAssignments();
      })

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
      this.selectedVehID = event.originalObject.id;
      this.CameraAssignments.forEach(a => {
        if(a.vehicleId == this.selectedVehID && a.deleted == false)
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
      this.selectedCamID = event.originalObject.id;
      this.CameraAssignments.forEach(a => {
        if(a.cameraId == this.selectedCamID && a.deleted == false)
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
    this.store.dispatch(new AddCameraAssignment({cameraAssignment: { id: this.id, cameraId: this.selectedCamID, vehicleId: this.selectedVehID, dateCreated: new Date(), deleted: false}}))
    this.id++;
  }

  DeleteAssignment(id: number){
  }

  ProcessAssignments() {

    this.rawAssignments.forEach(c => {
      let newAssignment = new CameraAssignmentFull();
      let full = {...c, ...newAssignment};
      let cam = this.cameras.find(c => c.id == full.cameraId);
      let veh = this.vehicles.find(v => v.id == full.vehicleId);

      if(cam && veh){
        full.cameraDeviceNo = cam.DeviceNo;
        full.vehicleName = veh.name;
        this.CameraAssignments.push(full);
        console.log('added one to the array like i want', this.CameraAssignments);

      }
    });
    this.FilterChange();
  }

  FilterChange(){
    this.filteredAssignments = this.CameraAssignments.filter(a => {
      let containsCameraString = a.cameraDeviceNo.toLowerCase().includes(this.cameraFilter.toLowerCase());
      let containsVehicleString = a.vehicleName.toLowerCase().includes(this.vehicleFilter.toLowerCase());

      return containsCameraString && containsVehicleString;
    })

  }
}
