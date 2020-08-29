import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackingPropsComponent } from './backing-props.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BackingPropsComponent', () => {
  let component: BackingPropsComponent;
  let fixture: ComponentFixture<BackingPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
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
