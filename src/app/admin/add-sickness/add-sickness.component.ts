import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-sickness',
  templateUrl: './add-sickness.component.html',
  styleUrls: ['./add-sickness.component.css']
})
export class AddSicknessComponent implements OnInit {

  sicknessGroups = ['requires 4 or more symptoms', 'requires all symptoms', 'requires 1 specific and 2 general symptoms'];

  name: string;
  group: number;  // 1 for g1, 2 for g2, 3 for g3

  loading = false;

  symptoms = [];
  unfilteredSymptoms = [];

  symptomsFilter = '';

  addedGeneralSymptoms = [];

  addedSpecificSymptoms = [];

  message = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {  }


  ngOnInit() {
    this.getSymptoms();
  }

  addSickness() {
    this.loading = true;
    const sicknessInfo = {
      'name': this.name,
      'sicknessGroup': this.group,
      'generalSymptoms': this.addedGeneralSymptoms,
      'specificSymptoms': this.addedSpecificSymptoms
    };
    this.adminService.addSickness(sicknessInfo)
      .subscribe(
        resp => {
          this.errorMessage = '';
          this.message = `Sickness '${sicknessInfo.name}' successfully added.`;
          this.resetComponent();
        },
        err => {
          this.message = '';
          this.errorMessage = `Sickness '${sicknessInfo.name}' already exists.`;
          this.resetComponent();
        });
  }

  addSymptomToGeneral(symptom) {
    if (this.symptomAdded(symptom)) {
      alert(`Symptom ${symptom.name} already added`);
    } else {
      this.addedGeneralSymptoms.push(symptom);
    }
  }

  addSymptomToSpecific(symptom) {
    if (this.symptomAdded(symptom)) {
      alert(`Symptom ${symptom.name} already added`);
    } else {
      this.addedSpecificSymptoms.push(symptom);
    }
    return false;  // required for the right click not to open the browser context menu
  }

  removeGeneralSymptom(symptom) {
    this.addedGeneralSymptoms = this.addedGeneralSymptoms.filter(ing => ing.name !== symptom.name);
  }

  removeSpecificSymptom(symptom) {
    this.addedSpecificSymptoms = this.addedSpecificSymptoms.filter(ing => ing.name !== symptom.name);
  }

  filterSymptoms(text) {
    console.log(text);
    this.symptoms = this.unfilteredSymptoms.filter(ing => ing.name.search(text) !== -1);
  }

  getSymptoms() {
    console.log('getting symptoms');
    this.adminService.getSymptoms()
      .subscribe(
        resp => {
          this.symptoms = resp;
          console.log(this.symptoms);
          this.unfilteredSymptoms = resp;
        },
        err => console.log(err)
      );
  }

  symptomAdded(symptom) {
    return this.addedGeneralSymptoms.find(ing => ing.name === symptom.name)
        || this.addedSpecificSymptoms.find(ing => ing.name === symptom.name);
  }

  resetComponent() {
    this.name = '';
    this.group = 0;
    this.addedGeneralSymptoms = [];
    this.addedSpecificSymptoms = [];
    this.loading = false;
  }

}
