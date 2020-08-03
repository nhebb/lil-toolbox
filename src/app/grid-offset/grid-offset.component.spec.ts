import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOffsetComponent } from './grid-offset.component';

describe('GridOffsetComponent', () => {
  let component: GridOffsetComponent;
  let fixture: ComponentFixture<GridOffsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
});
