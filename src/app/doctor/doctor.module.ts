import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DoctorService } from './doctor.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [AddPatientComponent, ReportsComponent],
  providers: [DoctorService]
})
export class DoctorModule { }
