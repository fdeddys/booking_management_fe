import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMonthlyComponent } from './report-monthly.component';

describe('ReportMonthlyComponent', () => {
  let component: ReportMonthlyComponent;
  let fixture: ComponentFixture<ReportMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMonthlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
