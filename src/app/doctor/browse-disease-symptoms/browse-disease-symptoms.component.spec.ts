import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDiseaseSymptomsComponent } from './browse-disease-symptoms.component';

describe('BrowseDiseaseSymptomsComponent', () => {
  let component: BrowseDiseaseSymptomsComponent;
  let fixture: ComponentFixture<BrowseDiseaseSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseDiseaseSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseDiseaseSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
