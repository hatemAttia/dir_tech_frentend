import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffControllerComponent } from './stuff-controller.component';

describe('StuffControllerComponent', () => {
  let component: StuffControllerComponent;
  let fixture: ComponentFixture<StuffControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuffControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuffControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
