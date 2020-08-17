import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-swap-assignment',
  templateUrl: './swap-assignment.component.html',
  styleUrls: ['./swap-assignment.component.css']
})
export class SwapAssignmentComponent implements OnInit {

  propsForm = new FormGroup({
    inputText: new FormControl('', [Validators.required]),
    outputText: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup): void {
    const input =  form.value.inputText;
    const result = this.swapAssignment(input);
    form.setValue({outputText: result});
  }

  private swapAssignment(input: string): string {
    const output: string[] = [];
    const lines = input.replace('\r\n', '\n').split('\n');
    for (const line of lines) {
      const txt = line.replace(';', '');
      const parts = txt.split('=');

      if (parts.length !== 2) { continue; }

      output.push(`${parts[1].trim()} = ${parts[0].trim()};`);
    }
    return output.join('\r\n');
  }
}
