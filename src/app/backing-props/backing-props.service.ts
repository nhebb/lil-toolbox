import { Injectable } from '@angular/core';
import { ViewModelItem } from './view-model-item';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class BackingPropsService {

  constructor() { }

  public createBackingProps(input: string, threadsafe: boolean): string {
    const viewModelItems = this.getViewModelItems(input);
    let output: string;
    if (viewModelItems.length === 0) {
      output = '<no view model items>';
    }
    else {
      output = this.generateCode(viewModelItems, threadsafe);
      if (output.length === 0) {
        output = '<no code generated>';
      }
    }
    return output;
  }

  private getViewModelItems(input: string): ViewModelItem[] {
      const q = '"';
      const xName = 'x:Name';
      const items: ViewModelItem[] = [];
      const lines = input.replace('\r\n', '\n').split('\n');

      for (const line of lines) {
          const txt = line.trim();
          if (txt.length === 0
            || txt.indexOf('//') === 0
            || txt.indexOf('/*') === 0
            || txt.indexOf('<Label') >= 0) {
              continue;
          }

          const posxName = txt.indexOf(xName);
          if (posxName >= 0) {
              const pos1 = txt.indexOf(q, posxName);
              const pos2 = txt.indexOf(q, pos1 + 1);
              const name = txt.substring(pos1 + 1, pos2);

              let dataType: string;
              let isCollectionElement = false;
              let isButton = false;

              if (txt.indexOf('<DatePick') === 0) {
                  dataType = 'DateTime';
              }
              else if (txt.indexOf('<CheckBox') === 0) {
                  dataType = 'bool';
              }
              else if (txt.indexOf('<Button') === 0) {
                  dataType = 'void';
                  isButton = true;
              }
              else if (txt.indexOf('<ListBox') === 0 ||
                       txt.indexOf('<ListView') === 0 ||
                       txt.indexOf('<ComboBox') === 0 ||
                       txt.indexOf('<DataGrid') === 0) {
                  if (name.endsWith('s')) {
                      dataType = name.substring(0, name.length);
                  }
                  else {
                      dataType = name;
                  }
                  isCollectionElement = true;
              }
              else {
                  dataType = 'string';
              }

              const item = new ViewModelItem();
              item.name = name;
              item.dataType = dataType;
              item.isButton = isButton;
              item.isCollectionElement = isCollectionElement;

              items.push(item);
              console.log('item added:\n' + item);
          }
      }
      return items;
  }

  private generateCode(viewModelItems: ViewModelItem[], threadsafe: boolean): string
  {
    const output: string[] = [];
    for (const item of viewModelItems) {
      if (item.isButton) {
          this.generateButtonCode(item, output);
      }
      else if (item.isCollectionElement) {
          this.generateCollectionCode(item, output, threadsafe);
      }
      else {
          this.generateStandardCode(item, output, threadsafe);
      }
    }
    return output.join('\r\n');
  }

  private generateButtonCode(item: ViewModelItem, output: string[])
  {
      output.push('public bool Can' + item.name + '()');
      output.push('{');
      output.push('    throw new NotImplementedException();');
      output.push('}');
      output.push('');
      output.push('public void ' + item.name + '()');
      output.push('{');
      output.push('    throw new NotImplementedException();');
      output.push('}');
      output.push('');
  }

  private generateCollectionCode(item: ViewModelItem, output: string[], threadsafe: boolean): void {
    const indent = '    ';
    const collectionBackingField = this.getBackingFieldName(item.name);

    let selectedItemBackingField = '_selected' + item.name;
    if (selectedItemBackingField.endsWith('s')) {
        selectedItemBackingField = selectedItemBackingField.substring(0, selectedItemBackingField.length);
    }

    let selectedItemProperty = 'Selected' + item.name;
    if (selectedItemProperty.endsWith('s')) {
        selectedItemProperty = selectedItemProperty.substring(0, selectedItemProperty.length);
    }

    output.push('private BindableCollection<' + item.dataType + '> ' + collectionBackingField + ';');
    output.push('public BindableCollection<' + item.dataType + '> ' + item.name);
    output.push('{');
    output.push(indent + 'get { return ' + collectionBackingField + '; }');
    output.push(indent + 'set');
    output.push(indent + '{');
    output.push(indent + indent + collectionBackingField + ' = value;');
    output.push(indent + indent + 'NotifyOfPropertyChange(() => ' + item.name + ');');
    output.push(indent + '}');
    output.push('}');
    output.push('');
    output.push('private ' + item.dataType + ' ' + selectedItemBackingField + ';');
    output.push('public ' + item.dataType + ' ' + selectedItemProperty);
    output.push('{');
    output.push(indent + 'get { return ' + selectedItemBackingField + '; }');
    output.push(indent + 'set');
    output.push(indent + '{');
    if (threadsafe) {
      output.push(indent + indent + 'var temp = value;');
      output.push(indent + indent + 'if(' + selectedItemBackingField + ' != temp)');
      output.push(indent + indent + '{');
      output.push(indent + indent + indent + selectedItemBackingField + ' = temp;');
      output.push(indent + indent + indent + 'NotifyOfPropertyChange(() => ' + selectedItemProperty + ');');
      output.push(indent + indent + '}');
    }
    else {
      output.push(indent + indent + 'if(' + selectedItemBackingField + ' != value)');
      output.push(indent + indent + '{');
      output.push(indent + indent + indent + selectedItemBackingField + ' = value;');
      output.push(indent + indent + indent + 'NotifyOfPropertyChange(() => ' + selectedItemProperty + ');');
      output.push(indent + indent + '}');
    }
    output.push(indent + '}');
    output.push('}');
    output.push('');
  }

  private generateStandardCode(item: ViewModelItem, output: string[], threadsafe: boolean): void {
      const indent = '    ';
      const backingName = this.getBackingFieldName(item.name);

      output.push('private ' + item.dataType + ' ' + backingName + ';');
      output.push('public ' + item.dataType + ' ' + item.name);
      output.push('{');
      output.push(indent + 'get { return ' + backingName + '; }');
      output.push(indent + 'set');
      output.push(indent + '{');
      if (threadsafe) {
        output.push(indent + indent + 'var temp = value;');
        output.push(indent + indent + 'if(' + backingName + ' != temp)');
        output.push(indent + indent + '{');
        output.push(indent + indent + indent + backingName + ' = temp;');
        output.push(indent + indent + indent + 'NotifyOfPropertyChange(() => ' + item.name + ');');
        output.push(indent + indent + '}');
      }
      else {
        output.push(indent + indent + 'if(' + backingName + ' != value)');
        output.push(indent + indent + '{');
        output.push(indent + indent + indent + backingName + ' = value;');
        output.push(indent + indent + indent + 'NotifyOfPropertyChange(() => ' + item.name + ');');
        output.push(indent + indent + '}');
      }
      output.push(indent + '}');
      output.push('}');
      output.push('');
  }

  private getBackingFieldName(name: string): string {
      if (name.length > 1) {
          return '_' + name.charAt(0).toLowerCase() + name.substring(1);
      }
      return '_' + name.toLowerCase();
  }

}
