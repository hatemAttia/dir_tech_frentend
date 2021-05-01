import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreControllerComponent } from './offre-controller.component';

describe('OffreControllerComponent', () => {
  let component: OffreControllerComponent;
  let fixture: ComponentFixture<OffreControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
