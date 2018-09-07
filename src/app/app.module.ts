import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccountModule,
    AdminModule,
    AppRoutingModule,
    BrowserModule,
    DoctorModule,
    NgbModule.forRoot(),
    RouterModule,
    SharedModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
