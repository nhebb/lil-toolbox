import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFromClassComponent } from './grid-from-class.component';

describe('GridFromClassComponent', () => {
  let component: GridFromClassComponent;
  let fixture: ComponentFixture<GridFromClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridFromClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFromClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Note: All relevant tests for this component are in wpf-grid-service.spec.ts

});
