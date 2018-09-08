import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseMostProbableComponent } from './diagnose-most-probable.component';

describe('DiagnoseMostProbableComponent', () => {
  let component: DiagnoseMostProbableComponent;
  let fixture: ComponentFixture<DiagnoseMostProbableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnoseMostProbableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseMostProbableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
