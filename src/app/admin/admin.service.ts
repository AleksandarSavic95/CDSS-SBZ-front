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
          return resp;
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

    // ##  Ingredients  ##
    getAllIngredients() {
        return this.http.get(`/api/ingredients`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    getIngredients(page: number, size: number) {
        return this.http.get(`/api/ingredients/page?number=${page}&size=${size}`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    searchIngredients(searchCriteria, page, size) {
        return this.http.get(`/api/ingredients/find?text=${searchCriteria}&page=${page}&size=${size}`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    addIngredient(ingredientInfo) {
        return this.http.post('/api/ingredients', ingredientInfo)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    editIngredient(ingredientID, editedIngredient) {
        return this.http.put(`/api/ingredients/${ingredientID}`, editedIngredient)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    deleteIngredient(id: string) {
        console.log('deleting ' + id);
        return this.http.delete(`/api/ingredients/${id}`)
            .pipe(map(resp => {
                console.log(resp);
                return resp as string;
            }), catchError(this.handleError));
    }


    // ##  Medicines  ##

    getAllMedicines() {
        return this.http.get(`/api/medicines`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    getMedicines(page: number, size: number) {
        return this.http.get(`/api/medicines/page?number=${page}&size=${size}`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    searchMedicines(searchCriteria, page, size) {
        return this.http.get(`/api/medicines/find?text=${searchCriteria}&page=${page}&size=${size}`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    addMedicine(medicineInfo) {
        return this.http.post('/api/medicines', medicineInfo)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    editMedicine(medicineID, editedMedicine) {
        return this.http.put(`/api/medicines/${medicineID}`, editedMedicine)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    deleteMedicine(id: string) {
        console.log('deleting ' + id);
        return this.http.delete(`/api/medicines/${id}`)
            .pipe(map(resp => {
                console.log(resp);
                return resp as string;
            }), catchError(this.handleError));
    }


    // ##  Symptoms  ##
    getSymptoms() {
        return this.http.get(`/api/symptoms`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    searchSymptoms(searchCriteria) {
        return this.http.get(`/api/symptoms/find?text=${searchCriteria}`)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return resp;
                }),
                catchError(this.handleError)
            );
    }

    addSymptom(info) {
        return this.http.post('/api/symptoms', info)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    editSymptom(ID, editedSymptom) {
        return this.http.put(`/api/symptoms/${ID}`, editedSymptom)
            .pipe(map(resp => {
                console.log(resp);
            }), catchError(this.handleError));
    }

    deleteSymptom(id: string) {
        console.log('deleting ' + id);
        return this.http.delete(`/api/symptoms/${id}`)
            .pipe(map(resp => {
                console.log(resp);
                return resp as string;
            }), catchError(this.handleError));
    }


}
