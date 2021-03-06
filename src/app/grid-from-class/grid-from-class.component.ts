import { Component, OnInit } from '@angular/core';

import { GridFromClassService } from './grid-from-class.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grid-from-class',
  templateUrl: './grid-from-class.component.html',
  styleUrls: ['./grid-from-class.component.css']
})
export class GridFromClassComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private gridService: GridFromClassService) {}

  ngOnInit(): void {
    this.myForm  = this.fb.group({
      inputText: ['', Validators.required],
      labelPlacement: ['left', Validators.required],
      firstRow: ['0', [Validators.required, Validators.pattern('^[0-9]*$')]],
      firstColumn: ['0', [Validators.required, Validators.pattern('^[0-9]*$')]],
      outputText: ['']
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const twoColumn = this.myForm.value.labelPlacement === 'left';
    const firstRow = this.myForm.value.firstRow;
    const firstColumn = this.myForm.value.firstColumn;
    const result = this.gridService.createGridFromClass(input, twoColumn, firstRow, firstColumn);
    this.myForm.patchValue({outputText: result});
  }

  copyText(outputElement: any) {
    outputElement.select();
    outputElement.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    outputElement.setSelectionRange(0, 0);
  }

}
