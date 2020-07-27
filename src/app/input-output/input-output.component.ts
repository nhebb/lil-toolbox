import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.css']
})
export class InputOutputComponent implements OnInit {

  public inputText: string;
  public outputText: string;

  constructor() { }

  ngOnInit(): void {
    this.inputText = '';
    this.outputText = '';
  }

  // getInputText(): string {
  //   return this.inputText;
  // }

  // setOutputText(text: string): void {
  //   this.outputText = text;
  // }

}
