import { Component, OnInit } from '@angular/core';
import { WpfGridService } from '../wpf-grid.service';
import { InputOutputComponent } from '../input-output/input-output.component';

@Component({
  selector: 'app-grid-from-class',
  templateUrl: './grid-from-class.component.html',
  styleUrls: ['./grid-from-class.component.css']
})
export class GridFromClassComponent implements OnInit {
  gridService: WpfGridService;

  constructor(gridService: WpfGridService) {
    this.gridService = gridService;
   }

  ngOnInit(): void {
  }

  create() {
    let result = this.gridService.create()
  }

}
