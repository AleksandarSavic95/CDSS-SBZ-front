import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }

  LOADED_PATIENT: any;

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - Admin Service', error);
    return Promise.reject(error);
  }


  addPatient(patientInfo) {
    return this.http.post('/api/patients', patientInfo)
      .pipe(map(resp => {
        console.log(resp);
        return resp;
      }), catchError(this.handleError));
  }


  getPatient(medicalCardNumber) {
    return this.http.get(`/api/patients/medicalCard?number=${medicalCardNumber}`)
        .pipe(
            map(resp => {
              console.log(resp);
              this.LOADED_PATIENT = resp;
              return resp;
            }),
            catchError(this.handleError)
        );
  }

  getPatients(size = 100) {
    return this.http.get(`/api/patients/page?number=${0}&size=${size}`);
  }

  deletePatient(id) {
    return this.http.delete(`/api/patients/${id}`);
  }

  getIntensiveCarePatients() {
    return this.http.get(`/api/monitoring`)
        .pipe(map(resp => {
          console.log(resp);
          return resp;
        }), catchError(this.handleError));
  }

  addPatientToCare(id, sickness) {
    return this.http.post(`/api/monitoring/patients/${id}`, sickness)
        .pipe(
            map(resp => {
              console.log(resp);
              return resp;
            }), catchError(this.handleError));
  }

  removeFromCare(id) {
    return this.http.put(`/api/monitoring/patients/${id}`);
  }

  // Sicknesses
  getPossibleSicknesses(id, patientInfo) {
    return this.http.post(`/api/patients/${id}/allPossibleSicknesses`, patientInfo);
  }

  getTheMostProbableSickness(id, patientInfo) {
    return this.http.post(`/api/patients/${id}/possibleSickness`, patientInfo);
  }

  startTreatment(sickness) {
    this.SICKNESS = sickness;
  }

  checkAllergies(medicines) {
    return this.http.post(`/api/patients/${this.LOADED_PATIENT.id}/checkAllergies`, medicines);
  }

  createTreatment(treatmentInfo) {
    return this.http.post(`/api/treatments/`, treatmentInfo);
  }

  getChronicallyIllPatients() {
    return this.http.get('/api/reports/chronically-sick');
  }

  getAddicteddPatients() {
    return this.http.get('/api/reports/addicts');
  }

  getWeakImmuneSystemPatients() {
    return this.http.get('/api/reports/weak-immunity');
  }
}
