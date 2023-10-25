import { TestBed } from '@angular/core/testing';

import { GetAudioService } from './get-audio.service';

describe('GetAudioService', () => {
  let service: GetAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
