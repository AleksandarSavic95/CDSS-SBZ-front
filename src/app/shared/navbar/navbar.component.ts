import { Component } from '@angular/core';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private principalService: PrincipalService) { }

  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  isAdmin(): boolean {
    return this.principalService.isAdmin();
  }

  isDoctor(): boolean {
    return this.principalService.isDoctor();
  }

  isAuthenticated(): boolean {
    return this.principalService.isAuthenticated();
  }
}
