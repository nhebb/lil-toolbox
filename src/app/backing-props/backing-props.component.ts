import { Component, OnInit } from '@angular/core';

import { BackingPropsService  } from './backing-props.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-backing-props',
  templateUrl: './backing-props.component.html',
  styleUrls: ['./backing-props.component.css']
})
export class BackingPropsComponent implements OnInit {
  propsForm = new FormGroup({
    inputText: new FormControl('', [Validators.required]),
    outputText: new FormControl(''),
    threadsafe: new FormControl('')
  });

  constructor(private backingPropsService: BackingPropsService) { }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    const input =  form.value.inputText;
    const threadsafe = form.value.threadsafe;

    const result = this.backingPropsService.createBackingProps(input, threadsafe)

    form.patchValue({outputText: result});
  }

}
