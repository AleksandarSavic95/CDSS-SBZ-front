import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-symptom',
  templateUrl: './add-symptom.component.html',
  styleUrls: ['./add-symptom.component.css']
})
export class AddSymptomComponent implements OnInit {


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

  addSymptom() {
    const symptomInfo = {
      'name': this.form.get('nameCtrl').value
    };
    this.loading = true;
    this.adminService.addSymptom(symptomInfo)
      .subscribe(
        resp => {
          this.errorMessage = '';
          this.message = `Symptom '${symptomInfo.name}' successfully added.`;
          this.form.get('nameCtrl').reset();
          this.loading = false;
        },
        err => {
          this.message = '';
          this.errorMessage = `Symptom '${symptomInfo.name}' already exists.`;
          this.form.get('nameCtrl').reset();
          this.loading = false;
        });
  }
}
