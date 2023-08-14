import { TestBed } from '@angular/core/testing';

import { GenerateTextService } from './generate-text.service';

describe('GenerateTextService', () => {
  let service: GenerateTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
