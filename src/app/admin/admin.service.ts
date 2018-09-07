import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - Admin Service', error);
    return Promise.reject(error);
  }


  getIngredients(page: number, size: number) {
    return this.http.get(`/api/ingredients/page?number=${page}&size=${size}`)
      .pipe(
        map(resp => {
          console.log(resp);
          return resp as Page;
        }),
        catchError(this.handleError)
      );
  }

  addDoctor(doctorInfo) {
    return this.http.post('/api/register', doctorInfo)
      .pipe(map(resp => {
        console.log(resp);
      }), catchError(this.handleError));
  }

  addIngredient(ingredientInfo) {
    return this.http.post('/api/add-ingredient', ingredientInfo)
      .pipe(map(resp => {
        console.log(resp);
      }), catchError(this.handleError));
  }

  addMedicine(medicineInfo) {
    return this.http.post('/api/add-medicine', medicineInfo)
      .pipe(map(resp => {
        console.log(resp);
      }), catchError(this.handleError));
  }

  // updateAlarmRule(editedAlarmRule) {
  //   return this.http.put(`/api/alarms/${editedAlarmRule.name}`, editedAlarmRule)
  //     .map(resp => {
  //       console.log(resp);
  //       return resp as string;
  //     })
  //     .catch(this.handleError);
  // }
  //
  // deleteAlarmRule(alarmName: string) {
  //   return this.http.delete(`/api/alarms/${alarmName}`)
  //     .map(resp => {
  //       console.log(resp);
  //       return resp as string;
  //     })
  //     .catch(this.handleError);
  // }

}
