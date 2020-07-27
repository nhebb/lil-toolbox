import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WpfGridService {

  constructor() { }

  create(input: string): string {
    const labelTemplate = '<Label Grid.Row="gridrow" Grid.Column="gridcol" Content="content" />';
    const controlTemplate = '<controlType x:Name="controlName" Grid.Row="gridrow" Grid.Column="gridcol" />';

    const lines = input.replace('\r\n', '\n').split('\n');
    const output: string[] = [];

    let row = 1;
    let col = 0;

    for (const line of lines){
      const txt = line.replace('public', '')
                      .replace('{ get; set; }', '')
                      .trim();
      if (txt.length === 0 || txt.indexOf('//') === 0){
        continue;
      }
      else if (txt.length === 0){
        row += 2;
        col = 0;
        output.push('');
        continue;
      }

      const parts = txt.split(' ');
      if (parts.length < 2)
      {
          output.push('// ' + txt);
          continue;
      }

      if (parts[1] === 'Id') { continue; }

      let controlType = 'TextBox'; // default
      if (parts[0].indexOf('DateTime') === 0)
      {
          controlType = 'DatePicker';
      }
      else if (parts[0].indexOf('bool') === 0)
      {
        controlType = 'CheckBox';
      }

      output.push(labelTemplate.replace('gridrow', row.toString(10))
                               .replace('gridcol', col.toString(10))
                               .replace('content', parts[1]));

      output.push(controlTemplate.replace('controlType', controlType)
                                 .replace('gridrow', (row + 1).toString(10))
                                 .replace('gridcol', col.toString(10))
                                 .replace('controlName', parts[1]));
    }

    return output.join('\r\n');
  }
}
