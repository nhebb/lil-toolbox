import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackingPropsGeneratorComponent } from './backing-props-generator.component';

describe('BackingPropsGeneratorComponent', () => {
  let component: BackingPropsGeneratorComponent;
  let fixture: ComponentFixture<BackingPropsGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackingPropsGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackingPropsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
