import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { OneLocationComponent } from './components/one-location/one-location.component';



@NgModule({
  declarations: [
    AddLocationComponent,
    EditLocationComponent,
    OneLocationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LocationModule { }
