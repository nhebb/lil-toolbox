import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WpfGridService {

  constructor() { }

  createGridFromClass(input: string, twoColumn: boolean, firstRow: number, firstColumn: number): string {
    const labelTemplate = '<Label Grid.Row="gridrow" Grid.Column="gridcol" Content="content" />';
    const controlTemplate = '<controlType x:Name="controlName" Grid.Row="gridrow" Grid.Column="gridcol" />';

    const lines = input.replace('\r\n', '\n').split('\n');
    const output: string[] = [];

    let row = isNaN(firstRow) || firstRow < 0 ? 0 : +firstRow;
    const col = isNaN(firstColumn) || firstColumn < 0 ? 0 : firstColumn;
    const rowOffset = twoColumn ? 0 : 1;
    const colOffset = twoColumn ? 1 : 0;
    const rowIncrement = twoColumn ? 1 : 2;

    for (const line of lines) {
      const txt = line.replace('public', '')
                      .replace('{ get; set; }', '')
                      .trim();
      if (txt.length === 0 ||
          txt.indexOf('//') === 0 ||
          txt.indexOf('/*') === 0 ||
          txt.charAt(0) === '{' ||
          txt.charAt(0) === '}') {
        continue;
      }
      else if (line.indexOf(' class ') >= 0 || line.indexOf('class ') === 0) {
        // could not get the following regex to work:
        // new RegExp('/\bclass\b/').test(txt)
        // console.log('position of " class ": ' + txt.indexOf('class') + '\nin text: ' + txt);
        continue;
      }
      else if (txt.length === 0) {
        row += rowIncrement;
        output.push('');
        continue;
      }

      const parts = txt.split(' ');
      if (parts.length < 2) {
          output.push('// ' + txt);
          continue;
      }

      let controlType = 'TextBox'; // default
      if (parts[0].indexOf('DateTime') === 0) {
          controlType = 'DatePicker';
      }
      else if (parts[0].indexOf('bool') === 0) {
        controlType = 'CheckBox';
      }

      // Split on camelCase, source: https://stackoverflow.com/a/54112355
      // tslint:disable-next-line: only-arrow-functions
      const label = parts[1].split(/([A-Z][a-z]+)/).filter(function(e){ return e; }).join(' ');

      output.push(labelTemplate.replace('gridrow', row.toString(10))
                               .replace('gridcol', (col).toString(10))
                               .replace('content', label));

      output.push(controlTemplate.replace('controlType', controlType)
                                 .replace('gridrow', (row + rowOffset).toString(10))
                                 .replace('gridcol', (col + colOffset).toString(10))
                                 .replace('controlName', parts[1]));

      row += rowIncrement;
    }

    return output.join('\r\n');
  }

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
