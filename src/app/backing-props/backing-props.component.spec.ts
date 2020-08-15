import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackingPropsComponent } from './backing-props.component';

describe('BackingPropsComponent', () => {
  let component: BackingPropsComponent;
  let fixture: ComponentFixture<BackingPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackingPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackingPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
