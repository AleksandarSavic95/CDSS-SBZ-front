import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = '';

  constructor(private principalService: PrincipalService) {
  }

  ngOnInit() {
    if (this.principalService.isAdmin()) {
      this.user += 'Logged in as: Admin';
    } else {
      this.user += 'Logged in as: Doctor';
    }
  }

}
