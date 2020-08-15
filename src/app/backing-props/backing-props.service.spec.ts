import { TestBed } from '@angular/core/testing';

import { BackingPropsService } from './backing-props.service';

describe('BackingPropsService', () => {
  let service: BackingPropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackingPropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
