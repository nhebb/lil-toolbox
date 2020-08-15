import { Component, OnInit } from '@angular/core';

import { WpfGridService } from '../wpf-grid.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid-offset',
  templateUrl: './grid-offset.component.html',
  styleUrls: ['./grid-offset.component.css']
})
export class GridOffsetComponent implements OnInit {
  offsetForm = new FormGroup({
    inputText: new FormControl('', [Validators.required]),
    outputText: new FormControl(''),
    direction: new FormControl('Row', [Validators.required]),
    offset: new FormControl('1', [Validators.required, Validators.pattern('^[0-9]*$')]),
    startIndex: new FormControl('1', [Validators.required, Validators.pattern('^[0-9]*$')])
  });

  constructor(private gridService: WpfGridService) {}

  ngOnInit(): void { }

  onSubmit(form: FormGroup): void {
    const input =  form.value.inputText;
    const direction = form.value.direction;
    const offset = form.value.offset;
    const startIndex = form.value.startIndex;

    const result = this.gridService.applyOffset(input, direction, offset, startIndex);

    form.patchValue({outputText: result});
  }

}
