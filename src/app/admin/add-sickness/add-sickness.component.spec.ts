import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSicknessComponent } from './add-sickness.component';

describe('AddSicknessComponent', () => {
  let component: AddSicknessComponent;
  let fixture: ComponentFixture<AddSicknessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSicknessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSicknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
