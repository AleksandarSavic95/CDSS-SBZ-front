import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ServerURLInterceptor} from '../auth/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AccountService} from './account.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerURLInterceptor,
      multi: true
    }
  ]
})
export class AccountModule { }
