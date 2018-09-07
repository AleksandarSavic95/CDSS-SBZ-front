import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PrincipalService } from '../../auth/principal.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  loading = false;

  errorMessage = '';

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private principalService: PrincipalService,
              private router: Router) {
    this.form = fb.group({
      usernameCtrl: ['', Validators.compose([Validators.required])],
      passwordCtrl: ['', Validators.compose([Validators.required])]
    });
  }


  ngOnInit() {
    this.logout();
  }

  login() {
    this.loading = true;
    // No ngModel, just FormGroup, as suggested here: https://next.angular.io/api/forms/FormControlName#use-with-ngmodel
    const username = this.form.get('usernameCtrl').value;
    const password = this.form.get('passwordCtrl').value;
    this.accountService.login({username: username, password: password})
      .subscribe(
        resp => {
          this.loading = false;
          if (this.principalService.isAdmin()) {
            this.router.navigate(['admin']);
          }
          if (this.principalService.isDoctor()) {
            this.router.navigate(['doctor']);
          }
        },
        err => {
          this.loading = false;
          console.log(err);
          this.errorMessage = err;
          this.form.get('usernameCtrl').reset();  // no ngModel >> https://next.angular.io/api/forms/FormControlName#use-with-ngmodel
          this.form.get('passwordCtrl').reset();
        });
  }

  logout() {
    this.accountService.logout();
  }

}
