import { Injectable } from '@angular/core';
import { ViewModelItem } from '../view-model-item';

@Injectable({
  providedIn: 'root'
})
export class BackingPropsService {

  constructor() { }

  createBackingProps(input: string): string {
    const lines = input.replace('\r\n', '\n').split('\n');
    const output: string[] = [];

    return output.join('\r\n');
  }
}
