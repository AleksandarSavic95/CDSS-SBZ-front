import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DoctorService } from './doctor.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReportsComponent } from './reports/reports.component';
import { IntensiveCareComponent } from './intensive-care/intensive-care.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { DiagnoseAllRelatedComponent } from './diagnose-all-related/diagnose-all-related.component';
import { TreatmentComponent } from './treatment/treatment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AddPatientComponent,
    ReportsComponent,
    IntensiveCareComponent,
    DiagnoseComponent,
    DiagnoseAllRelatedComponent,
    TreatmentComponent
  ],
  providers: [DoctorService]
})
export class DoctorModule { }
