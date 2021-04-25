import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStuffComponent } from './home-stuff.component';

describe('HomeStuffComponent', () => {
  let component: HomeStuffComponent;
  let fixture: ComponentFixture<HomeStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
