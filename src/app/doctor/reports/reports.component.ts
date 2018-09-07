import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  chronicText = 'List of patients with possible chronic illnesses';
  addictsText = 'List of patients who are possible addicts';
  weakImmuneText = 'List of patients with weakened immune system';

  chronic = false;
  addict = false;
  immune = false;

  firstRerportsLoad = true;  // to show the 'no patients' message

  patients: any;
  chronicallyIllPatients: any;

  loading = false;

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
  }

  getChronicallyIllPatients() {
    this.chronicTitle();
    this.loading = true;
    this.firstRerportsLoad = false;
    this.doctorService.getChronicallyIllPatients()
      .subscribe(
        resp => {
          console.log(resp);
          this.loading = false;
          this.chronicallyIllPatients = resp;
          this.patients = [];
        },
        err  => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  getAddictedPatients() {
    this.addictTitle();
    this.loading = true;
    this.firstRerportsLoad = false;
    this.doctorService.getAddicteddPatients()
      .subscribe(
        resp => {
          console.log(resp);
          this.patients = resp;
          this.chronicallyIllPatients = [];
          this.loading = false;
        },
        err  => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  getWeakImmuneSystemPatients() {
    this.immuneTitle();
    this.loading = true;
    this.firstRerportsLoad = false;
    this.doctorService.getWeakImmuneSystemPatients()
      .subscribe(
        resp => {
          console.log(resp);
          this.patients = resp;
          this.chronicallyIllPatients = [];
          this.loading = false;
        },
        err  => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  chronicTitle() {
    this.chronic = true;
    this.addict = false;
    this.immune = false;
  }

  addictTitle() {
    this.chronic = false;
    this.addict = true;
    this.immune = false;
  }

  immuneTitle() {
    this.chronic = false;
    this.addict = false;
    this.immune = true;
  }

}
