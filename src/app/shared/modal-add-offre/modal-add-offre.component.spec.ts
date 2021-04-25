import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOffreComponent } from './modal-add-offre.component';

describe('ModalAddOffreComponent', () => {
  let component: ModalAddOffreComponent;
  let fixture: ComponentFixture<ModalAddOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
