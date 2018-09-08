import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { DoctorService } from '../doctor.service';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  sickness = null;

  medicines = [];
  unfilteredMedicines = [];
  selectedMedicines = [];

  patientAllergies = null;

  message = '';
  errorMessage = '';

  constructor(private adminService: AdminService,
              private doctorService: DoctorService,
              private principalService: PrincipalService) { }

  ngOnInit() {
    this.getMedicines();
    this.sickness = this.doctorService.SICKNESS;
  }

  startTreatment() {
    console.log(this.principalService.getIdentity());
    const treatmentInfo = {
      doctor: {
        username: this.principalService.getIdentity().sub,
        role: this.principalService.getIdentity().roles[0].authority
      },
      patient: this.doctorService.LOADED_PATIENT,
      medicines: this.selectedMedicines,
      sickness: this.sickness
    };
    this.doctorService.createTreatment(treatmentInfo)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.errorMessage = '';
          this.message = 'Successfully started the treatment.';
        },
        err => {
          console.log(err);
          this.message = '';
          this.errorMessage = 'There was an error in starting the treatment.';
        }
      );
  }

  checkAllergies() {
    this.doctorService.checkAllergies(this.selectedMedicines)
      .subscribe(
        resp => {
          console.log(resp);
          this.patientAllergies = resp;
        },
        err  => console.log(err)
      );
  }

  addMedicine(medicine) {
    if (! this.selectedMedicines.some(med => med.name === medicine.name)) {
      console.log('adding ' + medicine.name);
      this.selectedMedicines.push(medicine);
    }
  }

  removeMedicine(medicine) {
    this.selectedMedicines = this.selectedMedicines.filter(med => med.name !== medicine.name);
  }

  filterMedicines(text) {
    console.log(text);
    this.medicines = this.unfilteredMedicines.filter(med => med.name.search(text) !== -1);
  }

  getMedicines() {
    this.adminService.getAllMedicines()
      .subscribe(
        resp => {
          this.medicines = resp;
          this.unfilteredMedicines = this.medicines;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }
}
