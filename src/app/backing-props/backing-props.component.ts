import { Component, OnInit } from '@angular/core';

import { BackingPropsService  } from './backing-props.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-backing-props',
  templateUrl: './backing-props.component.html',
  styleUrls: ['./backing-props.component.css']
})
export class BackingPropsComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private backingPropsService: BackingPropsService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      inputText: ['', Validators.required],
      outputText: [''],
      threadsafe: ['']
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const threadsafe = this.myForm.value.threadsafe === true;
    // console.log('input: ' + input + '\nthreadsafe: ' + threadsafe);
    const result = this.backingPropsService.createBackingProps(input, threadsafe);
    this.myForm.patchValue({outputText: result});
  }
}
