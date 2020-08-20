import { Component, OnInit } from '@angular/core';

import { WpfGridService } from '../shared/wpf-grid.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grid-from-class',
  templateUrl: './grid-from-class.component.html',
  styleUrls: ['./grid-from-class.component.css']
})
export class GridFromClassComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private gridService: WpfGridService) {}

  ngOnInit(): void {
    this.myForm  = this.fb.group({
      inputText: ['', Validators.required],
      labelPlacement: ['left', Validators.required],
      outputText: ['']
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const twoColumn = this.myForm.value.labelPlacement === 'left';
    // console.log(`input: ${input}`);
    const result = this.gridService.createGridFromClass(input, twoColumn);
    console.log('result:\n' + result);
    this.myForm.patchValue({outputText: result});
  }
}
