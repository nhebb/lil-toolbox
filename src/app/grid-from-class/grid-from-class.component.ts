import { Component, OnInit } from '@angular/core';

import { WpfGridService } from '../wpf-grid.service';

@Component({
  selector: 'app-grid-from-class',
  templateUrl: './grid-from-class.component.html',
  styleUrls: ['./grid-from-class.component.css']
})
export class GridFromClassComponent implements OnInit {
  inputText: string;
  outputText: string;

  constructor(private gridService: WpfGridService) {}

  ngOnInit(): void {
    this.inputText = '';
    this.outputText = '';
  }

  createGrid(value: string) {
    this.outputText = this.gridService.create(value);
  }

}
