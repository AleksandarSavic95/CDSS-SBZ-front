import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AdminService } from '../../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css']
})
export class DiagnoseComponent implements OnInit {

  patientSelected = false;
  patient: any;

  medicalCardNumber = '';

  personalDiagnosing = false;

  sicknesses = [];
  unfilteredSicknesses = [];

  message = '';
  errorMessage = '';

  selectedSickness = null;

  constructor(private adminService: AdminService,
              private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit() {}

  getPatient() {
    this.doctorService.getPatient(this.medicalCardNumber)
      .subscribe(
        resp => {
          this.patient = resp;
          this.patientSelected = true;
          this.message = 'Successfully loaded patient ' + this.patient.name;
          this.errorMessage = '';
        },
        err  => {
          console.log(err);
          this.message = '';
          this.errorMessage = 'Patient was ' + err.error ? err.error : err;
        }
      );
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

  getSicknesses() {
    this.adminService.getAllSicknesses()
      .subscribe(
        resp => {
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

  personalDiagnose() {
    this.personalDiagnosing = true;
    this.getSicknesses();
  }
}
