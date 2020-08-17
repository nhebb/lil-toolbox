import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WpfGridService {

  constructor() { }

  createGridFromClass(input: string): string {
    const labelTemplate = '<Label Grid.Row="gridrow" Grid.Column="gridcol" Content="content" />';
    const controlTemplate = '<controlType x:Name="controlName" Grid.Row="gridrow" Grid.Column="gridcol" />';

    const lines = input.replace('\r\n', '\n').split('\n');
    const output: string[] = [];

    let row = 1;
    const col = 1;

    for (const line of lines) {
      const txt = line.replace('public', '')
                      .replace('{ get; set; }', '')
                      .trim();
      if (txt.length === 0 ||
          txt.indexOf('//') ||
          txt.indexOf('/*') === 0 ||
          txt.charAt(0) === '{' ||
          txt.charAt(0) === '}' ||
          new RegExp('/\bclass\b/').test(txt)) {
        continue;
      }
      else if (txt.length === 0) {
        row += 2;
        output.push('');
        continue;
      }

      const parts = txt.split(' ');
      if (parts.length < 2) {
          output.push('// ' + txt);
          continue;
      }

      if (parts[1] === 'Id') { continue; }

      let controlType = 'TextBox'; // default
      if (parts[0].indexOf('DateTime') === 0) {
          controlType = 'DatePicker';
      }
      else if (parts[0].indexOf('bool') === 0) {
        controlType = 'CheckBox';
      }

      output.push(labelTemplate.replace('gridrow', row.toString(10))
                               .replace('gridcol', col.toString(10))
                               .replace('content', parts[1]));

      output.push(controlTemplate.replace('controlType', controlType)
                                 .replace('gridrow', (row + 1).toString(10))
                                 .replace('gridcol', col.toString(10))
                                 .replace('controlName', parts[1]));

      row += 2;
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

        console.log('pos1, pos2:' + pos1 + ', ' + pos2);

        const oldVal = line.substring(pos1 + 1, pos2);

        console.log('oldVal: ' + oldVal);

        let index = parseInt(oldVal, 10);
        if (!isNaN(index) && index >= +startIndex) {
          index += +offset;
          console.log('before: ' + oldVal + ', newVal: ' + index);
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
