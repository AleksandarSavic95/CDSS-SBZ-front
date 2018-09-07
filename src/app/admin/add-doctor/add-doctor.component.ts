import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  form: FormGroup;

  loading = false;

  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private adminService: AdminService) {
    this.form = fb.group({
      nameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      usernameCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      passwordCtrl: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]
    });
  }

  ngOnInit() {
  }


  addDoctor() {
    const doctorInfo = {
      'name': this.form.get('nameCtrl').value,
      'username': this.form.get('usernameCtrl').value,
      'password': this.form.get('passwordCtrl').value
    };
    this.loading = true;
    this.adminService.addDoctor(doctorInfo)
      .subscribe(
        resp => {
          this.errorMessage = '';
          this.message = `Doctor with username '${doctorInfo.username}' successfully added.`;
          this.form.get('usernameCtrl').reset();
          this.form.get('passwordCtrl').reset();
          this.loading = false;
        },
        err => {
          this.message = '';
          this.errorMessage = `Doctor with username '${doctorInfo.username}' already exists.`;
          this.form.get('usernameCtrl').reset();
          this.form.get('passwordCtrl').reset();
          this.loading = false;
        });
  }

}
