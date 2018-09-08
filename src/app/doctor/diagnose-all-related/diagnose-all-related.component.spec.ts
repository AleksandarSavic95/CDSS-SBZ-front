import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseAllRelatedComponent } from './diagnose-all-related.component';

describe('DiagnoseAllRelatedComponent', () => {
  let component: DiagnoseAllRelatedComponent;
  let fixture: ComponentFixture<DiagnoseAllRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnoseAllRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseAllRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
