import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { AddSymptomComponent } from './add-symptom/add-symptom.component';
import { AddSicknessComponent } from './add-sickness/add-sickness.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddDoctorComponent, AddIngredientComponent, AddMedicineComponent, AddSymptomComponent, AddSicknessComponent],
  providers: [AdminService]
})
export class AdminModule { }
