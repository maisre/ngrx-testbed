import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Camera } from '../camera.model';
import { Observable } from 'rxjs';
import { selectAll } from '../camera.reducer';
import { AddCamera } from '../camera.actions';
import { AppState } from '../app-state';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.less']  
})
export class CameraComponent {
  cameras$: Observable<any>;
  cameras: Camera[];
  id = 1;
  deviceNo = "";
  public newCameraDeviceNo: string = '';
  constructor(private store: Store<AppState>) { 
    this.store.pipe(
      select(state => selectAll(state.cameras))
    ).subscribe(v => {
      this.cameras = v;
      this.id = this.cameras.length;
    });
  }

  AddCamera() {
    this.id++;
    this.store.dispatch(new AddCamera({camera: {id: this.id, DeviceNo: this.deviceNo}}))
    this.deviceNo = "";
  }
}
