import { Component, OnInit, OnDestroy } from '@angular/core';
import { CameraService } from '../camera.service';
import { Subscription } from 'rxjs';
import { Camera } from 'src/models/Camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.less']
})
export class CameraComponent implements OnInit, OnDestroy {

  private cameraSub: Subscription;
  private showError: boolean = false;

  public Cameras: Camera[] = [];

  public newCameraDeviceNo: string = '';
  constructor(private cameraService: CameraService) { }

  ngOnInit() {
    this.cameraSub = this.cameraService.cameras.subscribe(cameras => {
      this.Cameras = cameras;
    })
  }

  ngOnDestroy(){
    this.cameraSub.unsubscribe();
  }

  AddCamera() {
    if(this.cameraService.DeviceExists(this.newCameraDeviceNo)){
      this.showError = true;
      return;
    }
    this.showError = false;
    this.cameraService.AddCamera(this.newCameraDeviceNo);
    this.newCameraDeviceNo = '';
  }
}
