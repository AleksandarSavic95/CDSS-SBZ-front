import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { ColorByParameterDirective } from './directives/color-by-parameter.directive';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [ColorByParameterDirective, NavbarComponent],
  exports: [ColorByParameterDirective, NavbarComponent]
})
export class SharedModule { }
