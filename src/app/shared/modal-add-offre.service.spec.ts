import { TestBed } from '@angular/core/testing';

import { ModalAddOffreService } from './modal-add-offre.service';

describe('ModalAddOffreService', () => {
  let service: ModalAddOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalAddOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
