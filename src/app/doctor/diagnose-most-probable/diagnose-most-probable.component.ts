import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AdminService } from '../../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnose-most-probable',
  templateUrl: './diagnose-most-probable.component.html',
  styleUrls: ['./diagnose-most-probable.component.css']
})
export class DiagnoseMostProbableComponent implements OnInit {

  diagnoseDescription = 'Choose symptoms to get one, most probable sickness.';

  patient: any;
  temperature = 36.5;

  symptoms = [];
  unfilteredSymptoms = [];
  selectedSymptoms = [];

  mostProbableSickness = null;

  message = '';
  errorMessage = '';

  constructor(private adminService: AdminService,
              private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit() {
    this.getPatient();
    this.getSymptoms();
  }

  startTreatment() {
    console.log('starting treatment for ' + this.mostProbableSickness.sickness.name);
    console.log(this.mostProbableSickness.sickness);
    this.doctorService.startTreatment(this.mostProbableSickness.sickness);
    this.router.navigate(['treatment']);
  }

  getTheMostProbableSickness() {
    const patientInfo = {
      temperature: this.temperature,
      symptoms: this.selectedSymptoms
    };
    this.doctorService.getTheMostProbableSickness(this.patient.id, patientInfo)
      .subscribe(
        resp => {
          console.log(resp);
          this.message = `Most probable sickness received successfully.`;
          this.mostProbableSickness = resp;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
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

  getPatient() {
    this.patient = this.doctorService.LOADED_PATIENT;
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
