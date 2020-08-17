import { TestBed } from '@angular/core/testing';

import { WpfGridService } from './wpf-grid.service';

describe('WpfGridService', () => {
  let service: WpfGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpfGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
