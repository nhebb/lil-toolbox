import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOffsetComponent } from './grid-offset.component';
import { WpfGridService } from '../shared/wpf-grid.service';

describe('GridOffsetComponent', () => {
  let component: GridOffsetComponent;
  const service: WpfGridService = new WpfGridService();
  let fixture: ComponentFixture<GridOffsetComponent>;

  const input =
`
<Label Grid.Row="1" Grid.Column="1" Content="Id" />
<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
<Label Grid.Row="2" Grid.Column="1" Content="Name" />
<TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
<Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOffsetComponent, WpfGridService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match expected positive row offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="3" Grid.Column="2" />';
    expect(service.applyOffset(input, 'Row', 1, 1)).toContain(expectedContent);
  });

  it('should match expected negative row offset', () => {
    const expectedContent = '<Label Grid.Row="1" Grid.Column="1" Content="Name" />';
    expect(service.applyOffset(input, 'Row', -1, 1)).toContain(expectedContent);
  });

  it('should match expected positive column offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="2" Grid.Column="3" />';
    expect(service.applyOffset(input, 'Column', 1, 1)).toContain(expectedContent);
  });

  it('should match expected negative column offset', () => {
    const expectedContent = '<TextBox x:Name="Name" Grid.Row="2" Grid.Column="1" />';
    expect(service.applyOffset(input, 'Column', -1, 1)).toContain(expectedContent);
  });
});
