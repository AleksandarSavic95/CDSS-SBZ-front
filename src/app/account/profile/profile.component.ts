import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  admin = false;
  doctor = false;
  noUser = true;
  functionalities = [];

  constructor(private principalService: PrincipalService) {
  }

  ngOnInit() {
    if (this.principalService.isAdmin()) {
      this.noUser = false;
      this.admin = true;
      this.functionalities = [
        'Add doctors to the system', 'Add and view ingredients', 'Add and view symptoms',
        'Add and view diseases', 'Add and view medications'
      ];
    }
    if (this.principalService.isDoctor()){
      this.noUser = false;
      this.doctor = true;
      this.functionalities = [
          'Add patients to the system', 'Create reports', 'Check patients',
        'Add patients to monitoring', 'View ingredients, symptoms, medications and diseases'
      ];
    }
  }

}
