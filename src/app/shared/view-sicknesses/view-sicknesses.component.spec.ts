import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSicknessesComponent } from './view-sicknesses.component';

describe('ViewSicknessesComponent', () => {
  let component: ViewSicknessesComponent;
  let fixture: ComponentFixture<ViewSicknessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSicknessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSicknessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
