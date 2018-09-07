import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../account/login/login.component';
import { AddDoctorComponent } from '../admin/add-doctor/add-doctor.component';
import { AddMedicineComponent } from '../admin/add-medicine/add-medicine.component';
import { AddIngredientComponent } from '../admin/add-ingredient/add-ingredient.component';


const appRoutes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'add-doctor', component: AddDoctorComponent
  },
  {
    path: 'add-ingredient', component: AddIngredientComponent
  },
  {
    path: 'add-medicine', component: AddMedicineComponent
  },
  // {
  //   path: 'doctor', component: DoctorProfileComponent,
  //   data: {authority: 'ROLE_DOCTOR'},
  //   canActivate: [UserRouteAccessService] DODAJ PROVAJDERA DOLE
  // },
  // {
  //   path: 'medication/:id', component: MedicationViewComponent
  // },
  // {
  //   path: '', redirectTo: '/ownerships', pathMatch: 'full'
  // }

  // {
  //   path: 'example', component: ExampleComponent
  // },
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
