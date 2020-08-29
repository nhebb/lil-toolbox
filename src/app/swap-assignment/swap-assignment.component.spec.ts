import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAssignmentComponent } from './swap-assignment.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SwapAssignmentComponent', () => {
  let component: SwapAssignmentComponent;
  let fixture: ComponentFixture<SwapAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
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

  it('should swap around equals sign', () => {
    const input = 'person.Weight = weight;';
    const expectedResult = 'weight = person.Weight;';
    const result = component.swapAssignment(input);
    expect(result).toContain(expectedResult);
  });
});
