import { TestBed } from '@angular/core/testing';

import { GridOffsetService } from './grid-offset.service';

describe('GridOffsetService', () => {
  let service: GridOffsetService;

  const gridInput =
  `
  <Label Grid.Row="1" Grid.Column="1" Content="Id" />
  <TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
  <Label Grid.Row="2" Grid.Column="1" Content="Name" />
  <TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
  <Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
  <DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
  `;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridOffsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should match expected positive row offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="3" Grid.Column="2" />';
    expect(service.applyOffset(gridInput, 'Row', 1, 1)).toContain(expectedContent);
  });

  it('should match expected negative row offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="1" Grid.Column="2" />';
    expect(service.applyOffset(gridInput, 'Row', -1, 1)).toContain(expectedContent);
  });

  it('should match expected positive column offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="2" Grid.Column="3" />';
    expect(service.applyOffset(gridInput, 'Column', 1, 1)).toContain(expectedContent);
  });

  it('should match expected negative column offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="2" Grid.Column="1" />';
    expect(service.applyOffset(gridInput, 'Column', -1, 1)).toContain(expectedContent);
  });
});
