import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOffsetComponent } from './grid-offset.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('GridOffsetComponent', () => {
  let component: GridOffsetComponent;
  let fixture: ComponentFixture<GridOffsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ GridOffsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Note: All relevant tests for this component are in wpf-grid-service.spec.ts

});
