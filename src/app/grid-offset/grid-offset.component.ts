import { Component, OnInit } from '@angular/core';

import { GridOffsetService } from './grid-offset.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grid-offset',
  templateUrl: './grid-offset.component.html',
  styleUrls: ['./grid-offset.component.css']
})
export class GridOffsetComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private offsetService: GridOffsetService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      inputText: ['', Validators.required],
      outputText: [''],
      direction: ['Row', Validators.required],
      offset: ['1', [Validators.required, Validators.pattern('^-?[0-9]*$')]],
      startIndex: ['1', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const direction = this.myForm.value.direction;
    const offset = this.myForm.value.offset;
    const startIndex = this.myForm.value.startIndex;

    const result = this.offsetService.applyOffset(input, direction, offset, startIndex);
    this.myForm.patchValue({outputText: result});
  }

  copyText(outputElement: any) {
    outputElement.select();
    outputElement.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    outputElement.setSelectionRange(0, 0);
  }
}
