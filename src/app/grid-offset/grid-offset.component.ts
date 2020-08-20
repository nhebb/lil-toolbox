import { Component, OnInit } from '@angular/core';

import { WpfGridService } from '../shared/wpf-grid.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grid-offset',
  templateUrl: './grid-offset.component.html',
  styleUrls: ['./grid-offset.component.css']
})
export class GridOffsetComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private gridService: WpfGridService) {}

  ngOnInit(): void { 
    this.myForm = this.fb.group({
      inputText: ['', Validators.required],
      outputText: [''],
      direction: ['Row', Validators.required],
      offset: ['1', [Validators.required, Validators.pattern('^[0-9]*$')]],
      startIndex: ['1', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const direction = this.myForm.value.direction;
    const offset = this.myForm.value.offset;
    const startIndex = this.myForm.value.startIndex;

    // console.log(`
    //   input: ${input}
    //   direction: ${direction}
    //   offset: ${offset}
    //   startIndex: ${startIndex}`);

    const result = this.gridService.applyOffset(input, direction, offset, startIndex);
    this.myForm.patchValue({outputText: result});
  }

}
