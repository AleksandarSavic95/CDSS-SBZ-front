import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AdminService } from '../../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnose-all-related',
  templateUrl: './diagnose-all-related.component.html',
  styleUrls: ['./diagnose-all-related.component.css']
})
export class DiagnoseAllRelatedComponent implements OnInit {

  patient: any;
  temperature = 36.5;

  diagnoseDescription = 'Choose symptoms to get a list of matching sicknesses';

  symptoms = [];
  unfilteredSymptoms = [];
  selectedSymptoms = [];

  message = '';
  errorMessage = '';

  possibleSicknesses = null;

  chosenSickness = null;

  constructor(private doctorService: DoctorService,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.getSymptoms();
    this.patient = this.doctorService.LOADED_PATIENT;
    console.log(this.patient);
  }

  getPossibleSicknesses() {
    const patientInfo = {
      temperature: this.temperature,
      symptoms: this.selectedSymptoms
    };
    console.log(patientInfo);
    this.doctorService.getPossibleSicknesses(this.patient.id, patientInfo)
      .subscribe(
        resp => {
          console.log(resp);
          this.possibleSicknesses = resp;
          this.message = `Received possible sicknesses successfully.`;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  startTreatment() {
    console.log('starting treatment for ' + this.chosenSickness.name);
    console.log(this.chosenSickness);
    this.doctorService.startTreatment(this.chosenSickness);
    this.router.navigate(['treatment']);
  }

  chooseSickness(sickness) {
    this.chosenSickness = sickness;
  }

  filterSymptoms(text) {
    console.log(text);
    this.symptoms = this.unfilteredSymptoms.filter(sympt => sympt.name.search(text) !== -1);
  }

  addSymptom(symptom) {
    if (! this.selectedSymptoms.some(sym => sym.name === symptom.name)) {
      console.log('adding ' + symptom.name);
      this.selectedSymptoms.push(symptom);
    }
  }

  removeSymptom(symptom) {
    this.selectedSymptoms = this.selectedSymptoms.filter(sym => sym.name !== symptom.name);
  }

  getSymptoms() {
    this.adminService.getSymptoms()
      .subscribe(
        resp => {
          this.symptoms = resp;
          this.unfilteredSymptoms = this.symptoms;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }
}
