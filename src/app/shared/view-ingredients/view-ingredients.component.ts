import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-view-ingredients',
  templateUrl: './view-ingredients.component.html',
  styleUrls: ['./view-ingredients.component.css']
})
export class ViewIngredientsComponent implements OnInit {

  searched = false;
  searchCriteria = '';

  loading = false;
  isAdmin = false;

  totalPages = 0;
  ingredientsInfo = null;
  ingredients = [];

  show = false;
  modalIngredient = null;
  newIngredient = {'name': 'New ingredient name'};

  page = 0;
  size = 10; // 10 moze stati na stranicu trenutno

  errorMessage = '';
  message = '';

  constructor(private adminService: AdminService,
              private principalService: PrincipalService) { }

  ngOnInit() {
    this.getIngredients();
    this.isAdmin = this.principalService.isAdmin();
  }


  search() {
    this.searched = true;
    this.adminService.searchIngredients(this.searchCriteria, this.page, this.size)
      .subscribe(
        resp => {
          this.ingredientsInfo = resp;
          this.ingredients = this.ingredientsInfo.content;
          this.totalPages = this.ingredientsInfo.totalPages;
        },
            err  => console.log(err)
      );
  }

  getIngredients() {
    this.searched = false;
    this.adminService.getIngredients(this.page, this.size)
      .subscribe(
        resp => {
        this.ingredientsInfo = resp;
        this.ingredients = this.ingredientsInfo.content;
        this.totalPages = this.ingredientsInfo.totalPages;
        },
        err => console.log(err)
      );
  }

  editIngredient() {
    this.adminService.editIngredient(this.modalIngredient.id, this.newIngredient)
      .subscribe(
        resp => {
          this.ingredients.map(ing => {
            if (ing.id === this.modalIngredient.id) {
              ing.name = this.newIngredient.name;
            }
          });
        },
        err  => console.log(err)
      );
    this.hide();
  }

  reveal(ingredient) {
    this.modalIngredient = ingredient;
    this.newIngredient.name = ingredient.name;
    this.show = true;
  }

  hide() {
    this.show = false;
  }

  deleteIngredient(ingredient) {
    if (confirm(`You are deleting ${ingredient.name}.`)) {
      this.ingredients = this.ingredients.filter(ing => ing.name !== ingredient.name);
      this.adminService.deleteIngredient(ingredient.id)
        .subscribe(
          resp => console.log(resp),
          err =>  console.log(err)
        );
    }
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.searched) {
      this.search();
    } else {
      this.getIngredients();
    }
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.searched) {
      this.search();
    } else {
      this.getIngredients();
    }
  }
}
