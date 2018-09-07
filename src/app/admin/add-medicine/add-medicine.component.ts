import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  form: FormGroup;

  loading = false;

  ingredientsFilter = '';
  addedIngredientsFilter = '';

  ingredientsInfo = null;

  ingredients = [];
  unfilteredIngredients = [];

  addedIngredients = [];
  unfilteredAddedIngredients = [];

  medicineTypes = ['ANTIBIOTIC', 'ANALGETIC', 'OTHER'];
  page = 0;
  size = 7;

  totalPages = 0;

  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private adminService: AdminService) {
    this.form = fb.group({
      nameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      typeCtrl: ['', Validators.compose([Validators.required])]
    });
  }


  ngOnInit() {
    this.getIngredients();
  }

  addMedicine() {
    this.loading = true;
    const medicineInfo = {
      'name': this.form.get('nameCtrl').value,
      'type': this.form.get('typeCtrl').value,
      'ingredients': this.addedIngredients
    };
    this.adminService.addMedicine(medicineInfo)
        .subscribe(
            resp => {
              this.errorMessage = '';
              this.message = `Medicine '${medicineInfo.name}' successfully added.`;
              this.form.get('nameCtrl').reset();
              this.form.get('typeCtrl').reset();
              this.addedIngredients = [];
              this.loading = false;
            },
            err => {
              this.message = '';
              this.errorMessage = `Medicine '${medicineInfo.name}' already exists.`;
              this.form.get('nameCtrl').reset();
              this.form.get('typeCtrl').reset();
              this.loading = false;
            });
  }

  addIngredient(ingredient) {
    if (this.addedIngredients.find(ing => ing.name === ingredient.name)) {
      alert(`Ingredient ${ingredient.name} already added`);
    } else {
      this.addedIngredients.push(ingredient);
      this.unfilteredAddedIngredients.push(ingredient);
    }
  }

  removeIngredient(ingredient) {
    this.addedIngredients = this.addedIngredients.filter(ing => ing.name !== ingredient.name);
    this.unfilteredAddedIngredients = this.unfilteredAddedIngredients.filter(ing => ing.name !== ingredient.name);
  }

  filterIngredients(text) {
    console.log(text);
    this.ingredients = this.unfilteredIngredients.filter(ing => ing.name.search(text) !== -1);
  }

  filterAddedIngredients(text) {
    console.log(text);
    // console.log(text.search('a') !== -1);
    this.addedIngredients = this.unfilteredAddedIngredients.filter(ing => ing.name.search(text) !== -1);
  }

  getIngredients() {
    console.log('getting ingredients');
    this.adminService.getIngredients(this.page, this.size)
        .subscribe(
            resp => {
              this.ingredientsInfo = resp;
              this.ingredients = this.ingredientsInfo.content;
              this.unfilteredIngredients = this.ingredientsInfo.content;
              this.totalPages = this.ingredientsInfo.totalPages;
            },
            err => console.log(err)
        );
    console.log(this.ingredientsInfo);
    console.log(this.page, this.size);
  }

  nextPage() {
    this.page = this.page + 1;
    this.getIngredients();
  }

  previousPage() {
    this.page = this.page - 1;
    this.getIngredients();
  }

}
