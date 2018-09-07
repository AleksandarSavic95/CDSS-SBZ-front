import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../account/login/login.component';
import { AddDoctorComponent } from '../admin/add-doctor/add-doctor.component';
import { AddMedicineComponent } from '../admin/add-medicine/add-medicine.component';
import { AddIngredientComponent } from '../admin/add-ingredient/add-ingredient.component';
import { ViewIngredientsComponent } from '../shared/view-ingredients/view-ingredients.component';
import { AddSicknessComponent } from '../admin/add-sickness/add-sickness.component';
import { AddSymptomComponent } from '../admin/add-symptom/add-symptom.component';
import { ViewSymptomsComponent } from '../shared/view-symptoms/view-symptoms.component';
import { ProfileComponent } from '../account/profile/profile.component';


const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },

  // Add Components
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'add-ingredient', component: AddIngredientComponent },
  { path: 'add-medication', component: AddMedicineComponent },
  { path: 'add-disease', component: AddSicknessComponent },
  { path: 'add-symptom', component: AddSymptomComponent },
  // { path: 'add-patient', component: AddPatientComponent },

  // Diagnose Components
  // { path: 'diagnose-patient', component: DiagnoseComponent },
  // { path: 'diagnose-most-probable', component: DiagnoseMostProbableComponent },
  // { path: 'diagnose-all-related', component: DiagnoseAllRelatedComponent },
  // { path: 'browse-disease-symptoms', component: BrowseDiseaseSymptomsComponent },

  // Treatment
  // { path: 'treatment', component: TreatmentComponent },

  // View Components
  { path: 'ingredients', component: ViewIngredientsComponent },
  // { path: 'medications', component: ViewMedicinesComponent },
  // { path: 'diseases', component: ViewSicknessesComponent },
  { path: 'symptoms', component: ViewSymptomsComponent },

  // Intensive care
  // { path: 'intensive-care', component: IntensiveCareComponent },

  // Reports
  // { path: 'reports', component: ReportsComponent },

  // Home
  { path: '', component: ProfileComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  // providers: [UserRouteAccessService]
})
export class AppRoutingModule { }
