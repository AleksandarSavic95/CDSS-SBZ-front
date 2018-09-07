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

}
