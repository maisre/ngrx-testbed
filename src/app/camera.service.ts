import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera } from 'src/models/Camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraObservers = [];
  private nextID: number = 4;
  private allCameras: Camera[] = [
    {ID: 1, DeviceNo: 'Axis P35'},
    {ID: 2, DeviceNo: 'Sony'},
    {ID: 3, DeviceNo: 'Bosch'}
  ];
  
  public cameras: Observable<Camera[]>;

  constructor() { 
    this.cameras = Observable.create(obs => {
      this.cameraObservers.push(obs);
      obs.next(this.allCameras);
    })
  }

  AddCamera(camDeviceNo: string){
    let cam = new Camera();
    cam.ID = this.nextID;
    this.nextID++;
    cam.DeviceNo = camDeviceNo;
    this.allCameras.push(cam);
    this.cameraObservers.forEach(obs => obs.next(this.allCameras));
  }

  DeviceExists(deviceNo: string): boolean{
    let exists = false;
    this.allCameras.forEach(cam => {
      if(cam.DeviceNo.toLowerCase() == deviceNo.toLowerCase()){
        exists = true;
      }
    })
    return exists;
  }
}
