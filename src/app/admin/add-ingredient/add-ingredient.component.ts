import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  form: FormGroup;

  loading = false;

  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private adminService: AdminService) {
    this.form = fb.group({
      nameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]
    });
  }


  ngOnInit() {
  }

  addIngredient() {
    const ingredientInfo = {
      'name': this.form.get('nameCtrl').value
    };
    this.loading = true;
    this.adminService.addIngredient(ingredientInfo)
      .subscribe(
        resp => {
          this.errorMessage = '';
          this.message = `Ingredient '${ingredientInfo.name}' successfully added.`;
          this.form.get('nameCtrl').reset();
          this.loading = false;
        },
        err => {
          this.message = '';
          this.errorMessage = `Ingredient '${ingredientInfo.name}' already exists.`;
          this.form.get('nameCtrl').reset();
          this.loading = false;
        });
  }

}
