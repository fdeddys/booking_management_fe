import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRoomEditComponent } from './master-room-edit.component';

describe('MasterRoomEditComponent', () => {
  let component: MasterRoomEditComponent;
  let fixture: ComponentFixture<MasterRoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterRoomEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterRoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
