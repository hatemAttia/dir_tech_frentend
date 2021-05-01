import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillControllerComponent } from './skill-controller.component';

describe('SkillControllerComponent', () => {
  let component: SkillControllerComponent;
  let fixture: ComponentFixture<SkillControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
