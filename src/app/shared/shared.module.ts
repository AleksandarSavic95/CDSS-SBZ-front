import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { ViewIngredientsComponent } from './view-ingredients/view-ingredients.component';
import { ViewSymptomsComponent } from './view-symptoms/view-symptoms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMedicinesComponent } from './view-medicines/view-medicines.component';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [NavbarComponent, ViewIngredientsComponent, ViewSymptomsComponent, ViewMedicinesComponent],
  exports: [NavbarComponent]
})
export class SharedModule { }
