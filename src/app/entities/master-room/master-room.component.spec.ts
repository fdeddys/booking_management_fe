import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRoomComponent } from './master-room.component';

describe('MasterRoomComponent', () => {
  let component: MasterRoomComponent;
  let fixture: ComponentFixture<MasterRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
