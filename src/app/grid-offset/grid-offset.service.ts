import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridOffsetService {

  constructor() { }

  applyOffset(input: string, direction: string, offset: number, startIndex: number): string {
    const lines = input.replace('\r\n', '\n').split('\n');
    const output: string[] = [];
    const q = '"';

    direction = 'Grid.' + direction + '=';

    for (const line of lines) {
      const pos = line.indexOf(direction);
      if (pos > 0) {
        const pos1 = line.indexOf(q, pos);
        if (pos1 < 0) {
          output.push(line);
          continue;
        }

        const pos2 = line.indexOf(q, pos1 + 1);
        if (pos2 < 0) {
          output.push(line);
          continue;
        }

        // console.log('pos1, pos2:' + pos1 + ', ' + pos2);

        const oldVal = line.substring(pos1 + 1, pos2);

        // console.log('oldVal: ' + oldVal);

        let index = parseInt(oldVal, 10);
        if (!isNaN(index) && index >= +startIndex) {
          index += +offset;
          // console.log('before: ' + oldVal + ', newVal: ' + index);
          const oldIndex = direction + `"${oldVal}"`;
          const newIndex = direction + `"${index}"`;
          output.push(line.replace(oldIndex, newIndex));
        }
        else {
          output.push(line);
        }
      }
      else {
        output.push(line);
      }
    }
    return output.join('\r\n');
  }
}
