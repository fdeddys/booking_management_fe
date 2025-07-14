import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewaEditComponent } from './sewa-edit.component';

describe('SewaEditComponent', () => {
  let component: SewaEditComponent;
  let fixture: ComponentFixture<SewaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SewaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SewaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
