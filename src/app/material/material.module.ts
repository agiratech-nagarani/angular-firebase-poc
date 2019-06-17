import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule, 
  MatSelectModule, 
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatRadioModule,
  MatListModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule, 
    MatSelectModule, 
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule, 
    MatSelectModule, 
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatListModule
  ]
})
export class MaterialModule { }
