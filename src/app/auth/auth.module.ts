import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthServerProvider} from './auth-jwt.service';
import {JWTUtilsService} from './jwt-utils.service';
import {LocalStorageService} from 'ng2-webstorage';
import {PrincipalService} from './principal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    AuthServerProvider,
    JWTUtilsService,
    LocalStorageService,
    PrincipalService
  ]
})
export class AuthModule { }
