import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-view-medicines',
  templateUrl: './view-medicines.component.html',
  styleUrls: ['./view-medicines.component.css']
})
export class ViewMedicinesComponent implements OnInit {

  searched = false;
  searchCriteria = '';

  loading = false;
  isAdmin = false;

  totalPages = 0;
  medicinesInfo = null;
  medicines = [];

  show = false;
  modalMedicine = null;
  newMedicine = {name: 'New medicine name', type: 'asd', ingredients: []};
  medicineTypes = ['ANTIBIOTIC', 'ANALGETIC', 'OTHER'];

  addedIngredientsPage = 0;
  addedIngredientsSize = 5;
  pagedAddedIngredients = [];
  totalAddedIngredientsPages = 0;

  newIngredientsPage = 0;
  newIngredientsSize = 5;
  totalNewIngredientsPages = 0;
  newIngredients = [];

  page = 0;
  size = 10; // 10 moze stati na stranicu trenutno

  errorMessage = '';
  message = '';

  constructor(private adminService: AdminService,
              private principalService: PrincipalService) { }

  ngOnInit() {
    this.getMedicines();
    this.isAdmin = this.principalService.isAdmin();
  }


  search() {
    this.searched = true;
    this.adminService.searchMedicines(this.searchCriteria, this.page, this.size)
      .subscribe(
        resp => {
          this.medicinesInfo = resp;
          this.medicines = this.medicinesInfo.content;
          this.totalPages = this.medicinesInfo.totalPages;
        },
        err  => console.log(err)
      );
  }

  getMedicines() {
    this.searched = false;
    this.adminService.getMedicines(this.page, this.size)
      .subscribe(
        resp => {
          this.medicinesInfo = resp;
          this.medicines = this.medicinesInfo.content;
          this.totalPages = this.medicinesInfo.totalPages;
        },
        err => console.log(err)
      );
  }

  deleteMedicine(medicine) {
    if (confirm(`You are deleting ${medicine.name}.`)) {
      this.medicines = this.medicines.filter(med => med.name !== medicine.name);
      this.adminService.deleteMedicine(medicine.id)
        .subscribe(
          resp => console.log(resp),
          err =>  console.log(err)
        );
    }
  }

  editMedicine() {
    console.log(this.modalMedicine);
    console.log(this.newMedicine);
    this.adminService.editMedicine(this.modalMedicine.id, this.newMedicine)
      .subscribe(
        resp => {
          this.medicines.map(med => {
            if (med.id === this.modalMedicine.id) {
              med.name = this.newMedicine.name;
            }
          });
        },
        err  => console.log(err)
      );
    this.hide();
  }

  reveal(medicine) {
    this.modalMedicine = medicine;
    this.newMedicine.name = medicine.name;
    this.newMedicine.type = medicine.type;
    this.newMedicine.ingredients = medicine.ingredients;
    this.getNewIngredients();
    this.pagedAddedIngredients = this.newMedicine.ingredients
      .slice(this.addedIngredientsPage * this.addedIngredientsSize, (this.addedIngredientsPage + 1) * this.addedIngredientsSize);
    this.totalAddedIngredientsPages = Math.ceil(medicine.ingredients.length / this.addedIngredientsSize);
    this.show = true;
  }

  hide() {
    this.show = false;
    this.newIngredientsPage = 0;
    this.addedIngredientsPage = 0;
  }

  getNewIngredients() {
    this.adminService.getIngredients(this.newIngredientsPage, this.newIngredientsSize)
      .subscribe(
        resp => {
          console.log(resp);
          this.newIngredients = resp.content;
          this.totalNewIngredientsPages = resp.totalPages;
        },
        err  => console.log(err)
      );
  }

  addIngredient(ingredient) {
    if (! this.newMedicine.ingredients.some(ing => ing.name === ingredient.name)) {
      console.log('adding ' + ingredient.name);
      this.newMedicine.ingredients.push(ingredient);
      this.updateAddedIngredientsView(ingredient);
      this.countAddedIngredientsPages();
    }
  }

  removeIngredient(ingredient) {
    console.log('removing ' + ingredient.name);
    this.newMedicine.ingredients = this.newMedicine.ingredients.filter(ing => ing.name !== ingredient.name);
    this.pagedAddedIngredients = this.pagedAddedIngredients.filter(ing => ing.name !== ingredient.name);
    this.updateAddedIngredientsView(ingredient);
    this.countAddedIngredientsPages();
  }

  nextAddedIngredientsPage() {
    this.addedIngredientsPage = this.addedIngredientsPage + 1;
    this.pagedAddedIngredients = this.newMedicine.ingredients
      .slice(this.addedIngredientsPage * this.addedIngredientsSize, (this.addedIngredientsPage + 1) * this.addedIngredientsSize);
  }

  previousAddedIngredientsPage() {
    this.addedIngredientsPage = this.addedIngredientsPage - 1;
    this.pagedAddedIngredients = this.newMedicine.ingredients
      .slice(this.addedIngredientsPage * this.addedIngredientsSize, (this.addedIngredientsPage + 1) * this.addedIngredientsSize);
  }

  nextNewIngredientsPage() {
    this.newIngredientsPage = this.newIngredientsPage + 1;
    this.getNewIngredients();
  }

  previousNewIngredientsPage() {
    this.newIngredientsPage = this.newIngredientsPage - 1;
    this.getNewIngredients();
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.searched) {
      this.search();
    } else {
      this.getMedicines();
    }
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.searched) {
      this.search();
    } else {
      this.getMedicines();
    }
  }

  updateAddedIngredientsView(ingredient) {
    this.pagedAddedIngredients = this.newMedicine.ingredients
      .slice(this.addedIngredientsPage * this.addedIngredientsSize, (this.addedIngredientsPage + 1) * this.addedIngredientsSize);
  }

  countAddedIngredientsPages() {
    this.totalAddedIngredientsPages = Math.ceil(this.newMedicine.ingredients.length / this.addedIngredientsSize);
  }
}
