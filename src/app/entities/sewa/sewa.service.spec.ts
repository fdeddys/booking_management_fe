import { TestBed } from '@angular/core/testing';

import { SewaService } from './sewa.service';

describe('SewaService', () => {
  let service: SewaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SewaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
