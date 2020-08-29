import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-swap-assignment',
  templateUrl: './swap-assignment.component.html',
  styleUrls: ['./swap-assignment.component.css']
})
export class SwapAssignmentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      inputText: ['', Validators.required],
      outputText: ['']
    });
  }

  onSubmit(): void {
    const input =  this.myForm.value.inputText;
    const result = this.swapAssignment(input);
    this.myForm.patchValue({outputText: result});
  }

  public swapAssignment(input: string): string {
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

  copyText(outputElement: any) {
    outputElement.select();
    outputElement.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    outputElement.setSelectionRange(0, 0);
  }
}
