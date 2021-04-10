import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaherListComponent } from './teaher-list.component';

describe('TeaherListComponent', () => {
  let component: TeaherListComponent;
  let fixture: ComponentFixture<TeaherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
