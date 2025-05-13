import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewaComponent } from './sewa.component';

describe('SewaComponent', () => {
  let component: SewaComponent;
  let fixture: ComponentFixture<SewaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SewaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SewaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
