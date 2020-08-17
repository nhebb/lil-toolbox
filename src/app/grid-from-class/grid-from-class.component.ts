import { Component, OnInit } from '@angular/core';

import { WpfGridService } from '../shared/wpf-grid.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid-from-class',
  templateUrl: './grid-from-class.component.html',
  styleUrls: ['./grid-from-class.component.css']
})
export class GridFromClassComponent implements OnInit {
  gridForm = new FormGroup({
    inputText: new FormControl('', [Validators.required]),
    outputText: new FormControl(''),
  });

  constructor(private gridService: WpfGridService) {}

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    const input =  form.value.inputText;
    const result = this.gridService.createGridFromClass(input);

    form.patchValue({outputText: result});
  }
}
