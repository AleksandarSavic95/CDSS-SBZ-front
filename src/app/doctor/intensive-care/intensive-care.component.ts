import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-intensive-care',
  templateUrl: './intensive-care.component.html',
  styleUrls: ['./intensive-care.component.css']
})
export class IntensiveCareComponent implements OnInit {

  loading = false;

  patients = [];
  intensiveCarePatients = [];

  errorMessage = '';
  message = '';
  modalErrorMessage = '';

  modalPatient = null;
  chosenSicknessIndex = null;

  show = false;

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getPatients();
    this.getIntensiveCarePatients();
  }

  getPatients() {
    this.loading = true;
    this.doctorService.getPatients()
      .subscribe(
        (resp: any) => {
          this.patients = resp.content;
          console.log(this.patients);
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
          this.loading = false;
        }
      );
  }

  getIntensiveCarePatients() {
    this.doctorService.getIntensiveCarePatients()
      .subscribe(
        resp => {
          this.intensiveCarePatients = resp ? resp : [];
          console.log(this.intensiveCarePatients);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  deletePatient(patient) {
    if (confirm(`You are deleting ${patient.name}.`)) {
      this.patients = this.patients.filter(pat => pat.name !== patient.name);
      this.doctorService.deletePatient(patient.id)
        .subscribe(
          resp => console.log(resp),
          err =>  console.log(err)
        );
    }
  }

  hide() {
    this.modalPatient = null;
    this.chosenSicknessIndex = null;
    this.show = false;
  }

  chooseSickness(patient) {
    this.modalPatient = patient;
    this.show = true;
  }

  addToCare() {
    const newPatient = {
      patient: this.modalPatient,
      sickness: this.modalPatient.sickFrom[this.chosenSicknessIndex],
      oxygenLevel: {}
    };
    console.log(this.modalPatient.sickFrom[this.chosenSicknessIndex]);
    this.doctorService.addPatientToCare(newPatient.patient.id, newPatient.sickness)
      .subscribe(
        resp => {
          const noPatient = this.intensiveCarePatients.find(pat => pat.patient.name === newPatient.patient.name);
          if ( ! noPatient) {
            this.intensiveCarePatients.push(newPatient);
            this.hide();
          } else {
            this.modalErrorMessage = 'Patient already on intensive care.';
          }
        },
        err =>  {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  removeFromCare(intensiveCarePatient) {
    if (confirm(`You are removing ${intensiveCarePatient.patient.name} from intensive care.`)) {
      this.intensiveCarePatients = this.intensiveCarePatients.filter(pat => pat.patient.name !== intensiveCarePatient.patient.name);
      this.doctorService.removeFromCare(intensiveCarePatient.patient.id)
        .subscribe(
          resp => console.log(resp),
          err =>  console.log(err)
        );
    }
  }
}
