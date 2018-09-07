import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { PrincipalService } from '../../auth/principal.service';

@Component({
  selector: 'app-view-sicknesses',
  templateUrl: './view-sicknesses.component.html',
  styleUrls: ['./view-sicknesses.component.css']
})
export class ViewSicknessesComponent implements OnInit {

  searched = false;
  searchCriteria = '';

  loading = false;
  isAdmin = false;

  sicknessesInfo = {content: [], totalPages: 0};

  totalPages = 0;
  sicknesses = [];

  show = false;
  modalSickness = null;
  newSickness = {name: 'New sickness name', sicknessGroup: 0, generalSymptoms: [], specificSymptoms: []};
  sicknessGroups = ['at least 4 symptoms', 'all symptoms', '1 specific and 2 general symptoms'];

  page = 0;
  size = 5; // 10 moze stati na stranicu trenutno

  errorMessage = '';
  message = '';

  constructor(private adminService: AdminService,
              private principalService: PrincipalService) { }

  ngOnInit() {
    this.getSicknesses();
    this.isAdmin = this.principalService.isAdmin();
  }


  search() {
    this.searched = true;
    this.adminService.searchSicknesses(this.searchCriteria, this.page, this.size)
      .subscribe(
        resp => {
          this.sicknessesInfo = resp;
          this.sicknesses = this.sicknessesInfo.content;
          this.totalPages = this.sicknessesInfo.totalPages;
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  getSicknesses() {
    this.searched = false;
    this.adminService.getSicknesses(this.page, this.size)
      .subscribe(
        resp => {
          this.sicknessesInfo = resp;
          this.sicknesses = this.sicknessesInfo.content;
          this.totalPages = this.sicknessesInfo.totalPages;
        },
        err => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
  }

  deleteSickness(sickness) {
    if (confirm(`You are deleting ${sickness.name}.`)) {
      this.sicknesses = this.sicknesses.filter(s => s.name !== sickness.name);
      this.adminService.deleteSickness(sickness.id)
        .subscribe(
          resp => console.log(resp),
          err =>  {
            console.log(err);
            this.errorMessage = err.error ? err.error : err;
          }
        );
    }
  }

  editSickness() {
    this.adminService.editSickness(this.modalSickness.id, this.newSickness)
      .subscribe(
        resp => {
          this.sicknesses.map(s => {
            if (s.id === this.modalSickness.id) {
              s.name = this.newSickness.name;
              s.sicknessGroup = this.newSickness.sicknessGroup;
            }
          });
        },
        err  => {
          console.log(err);
          this.errorMessage = err.error ? err.error : err;
        }
      );
    this.hide();
  }

  reveal(sickness) {
    this.modalSickness = sickness;
    this.newSickness.name = sickness.name;
    this.newSickness.sicknessGroup = sickness.sicknessGroup;
    this.newSickness.generalSymptoms = sickness.generalSymptoms;
    this.newSickness.specificSymptoms = sickness.specificSymptoms;
    this.show = true;
  }

  hide() {
    this.show = false;
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.searched) {
      this.search();
    } else {
      this.getSicknesses();
    }
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.searched) {
      this.search();
    } else {
      this.getSicknesses();
    }
  }
}
