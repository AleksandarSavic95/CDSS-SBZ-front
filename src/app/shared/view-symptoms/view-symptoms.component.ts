import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-view-symptoms',
  templateUrl: './view-symptoms.component.html',
  styleUrls: ['./view-symptoms.component.css']
})
export class ViewSymptomsComponent implements OnInit {

  loading = false;
  isAdmin = false;

  symptoms = [];

  show = false;
  modalSymptom = null;
  newSymptom = {'name': 'New symptom name'};

  errorMessage = '';
  message = '';

  constructor(private adminService: AdminService,
              private principalService: PrincipalService) { }

  ngOnInit() {
    this.getSymptoms();
    this.isAdmin = this.principalService.isAdmin();
  }

  getSymptoms() {
    this.adminService.getSymptoms()
      .subscribe(
        resp => {
          this.symptoms = resp.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  editSymptom() {
    this.adminService.editSymptom(this.modalSymptom.id, this.newSymptom)
      .subscribe(
        resp => {
          this.symptoms.map(ing => {
            if (ing.id === this.modalSymptom.id) {
              ing.name = this.newSymptom.name;
            }
          });
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
    this.hide();
  }

  reveal(symptom) {
    this.modalSymptom = symptom;
    this.newSymptom.name = symptom.name;
    this.show = true;
  }

  hide() {
    this.show = false;
  }

  deleteSymptom(symptom) {
    if (confirm(`You are deleting ${symptom.name}.`)) {
      this.symptoms = this.symptoms.filter(ing => ing.name !== symptom.name);
      this.adminService.deleteSymptom(symptom.id)
        .subscribe(
          resp => console.log(resp),
          err =>  console.log(err)
        );
    }
  }

}
