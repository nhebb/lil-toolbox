import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAssignmentComponent } from './swap-assignment.component';

describe('SwapAssignmentComponent', () => {
  let component: SwapAssignmentComponent;
  let fixture: ComponentFixture<SwapAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
