import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-browse-disease-symptoms',
  templateUrl: './browse-disease-symptoms.component.html',
  styleUrls: ['./browse-disease-symptoms.component.css']
})
export class BrowseDiseaseSymptomsComponent implements OnInit {

  diagnoseDescription = 'Choose sickness to get it\'s list of symptoms.';

  patient: any;

  sicknesses = [];
  unfilteredSicknesses = [];
  selectedSickness = null;

  message = '';
  errorMessage = '';

  constructor(private adminService: AdminService,
              private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit() {
    this.getPatient();
    this.getSicknesses();
  }

  startTreatment() {
    console.log('starting treatment for ' + this.selectedSickness.name);
    console.log(this.selectedSickness);
    this.doctorService.startTreatment(this.selectedSickness);
    this.router.navigate(['treatment']);
  }

  selectSickness(sickness) {
    this.selectedSickness = sickness;
  }

  filterSicknesses(text) {
    console.log(text);
    this.sicknesses = this.unfilteredSicknesses.filter(sick => sick.name.search(text) !== -1);
  }

  getPatient() {
    this.patient = this.doctorService.LOADED_PATIENT;
  }

  getSicknesses() {
    this.adminService.getAllSicknesses()
      .subscribe(
        resp => {
          console.log('\nsickness response');
          console.log(resp);
          this.sicknesses = resp;
          this.unfilteredSicknesses = resp;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }
}
