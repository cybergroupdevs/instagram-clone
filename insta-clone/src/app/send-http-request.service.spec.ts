import { TestBed } from '@angular/core/testing';

import { SendHttpRequestService } from './send-http-request.service';

describe('SendHttpRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendHttpRequestService = TestBed.get(SendHttpRequestService);
    expect(service).toBeTruthy();
  });
});
