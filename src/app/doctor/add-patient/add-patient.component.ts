import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  name = '';
  medicalCardNumber = '';
  ingredients = [];
  medicines = [];
  unfilteredIngredients = [];
  unfilteredMedicines = [];

  message = '';
  errorMessage = '';

  alergenIngredients = [];
  alergenMedicines = [];

  constructor(private adminService: AdminService,
              private doctorService: DoctorService) { }

  ngOnInit() {
    this.getIngredients();
    this.getMedicines();
  }

  addPatient() {
    const patientInfo = {
      name: this.name,
      medicalCardNumber: this.medicalCardNumber,
      allergensIngredients: this.alergenIngredients,
      allergensMedicines: this.alergenMedicines
    };
    console.log(patientInfo);
    this.doctorService.addPatient(patientInfo)
      .subscribe(
        resp => {
          console.log(resp);
          this.message = `Patient ${patientInfo.name} was added successfully.`;
          this.name = '';
          this.medicalCardNumber = '';
          this.alergenIngredients = [];
          this.alergenMedicines = [];
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  getIngredients() {
    this.adminService.getAllIngredients()
      .subscribe(
        resp => {
          this.ingredients = resp;
          this.unfilteredIngredients = this.ingredients;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  getMedicines() {
    this.adminService.getAllMedicines()
      .subscribe(
        resp => {
          this.medicines = resp;
          this.unfilteredMedicines = this.medicines;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  addIngredient(ingredient) {
    if (! this.alergenIngredients.some(ing => ing.name === ingredient.name)) {
      console.log('adding ' + ingredient.name);
      this.alergenIngredients.push(ingredient);
    }
  }

  addMedicine(medicine) {
    if (! this.alergenMedicines.some(med => med.name === medicine.name)) {
      console.log('adding ' + medicine.name);
      this.alergenMedicines.push(medicine);
    }
  }

  removeIngredient(ingredient) {
    this.alergenIngredients = this.alergenIngredients.filter(ing => ing.name !== ingredient.name);
  }

  removeMedicine(medicine) {
    this.alergenMedicines = this.alergenMedicines.filter(med => med.name !== medicine.name);
  }

  filterIngredients(text) {
    console.log(text);
    this.ingredients = this.unfilteredIngredients.filter(ing => ing.name.search(text) !== -1);
  }

  filterMedicines(text) {
    console.log(text);
    this.medicines = this.unfilteredMedicines.filter(med => med.name.search(text) !== -1);
  }
}
