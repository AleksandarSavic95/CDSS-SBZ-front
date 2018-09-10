import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterAlarmsComponent } from './toaster-alarms.component';

describe('ToasterAlarmsComponent', () => {
  let component: ToasterAlarmsComponent;
  let fixture: ComponentFixture<ToasterAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToasterAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
