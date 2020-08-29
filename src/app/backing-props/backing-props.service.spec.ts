import { TestBed } from '@angular/core/testing';

import { BackingPropsService } from './backing-props.service';

describe('BackingPropsService', () => {
  let service: BackingPropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackingPropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not create a backing field for Label', () => {
    const input = '<Label x:Name="IdLabel" Grid.Row="1" Grid.Column="1" Content="Id" />';
    const result = service.createBackingProps(input, false);
    expect(result).not.toContain('IdLabel');
  });

  it('should create DateTime backing field for DatePicker', () => {
    const input = '<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('private DateTime _dateOfBirth;');
  });

  it('should create DateTime property for DatePicker', () => {
    const input = '<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('public DateTime DateOfBirth');
  });

  it('should create bool backing field for CheckBox', () => {
    const input = '<CheckBox x:Name="Registered" Grid.Row="4" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('private bool _registered;');
  });

  it('should create bool property for CheckBox', () => {
    const input = '<CheckBox x:Name="Registered" Grid.Row="4" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('public bool Registered');
  });

  it('should create Button methods', () => {
    const input = '<Button x:Name="Save" Grid.Row="6" Grid.Column="1">Save</Button>';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('bool CanSave()');
    expect(result).toContain('void Save()');
  });

  it('should create BindableCollection for list controls', () => {
    const input = '<ListBox x:Name="FavoriteFoods" Grid.Row="5" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('private BindableCollection<FavoriteFoods> _favoriteFoods;');
    expect(result).toContain('public BindableCollection<FavoriteFoods> FavoriteFoods');
  });

  it('should create selected item for list controls', () => {
    const input = '<ListBox x:Name="FavoriteFoods" Grid.Row="5" Grid.Column="2" />';
    const result = service.createBackingProps(input, false);
    expect(result).toContain('private FavoriteFoods _selectedFavoriteFoods;');
    expect(result).toContain('public FavoriteFoods SelectedFavoriteFoods');
  });

  it('should create temp variable for threadsafe option', () => {
    const input = '<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />';
    const result = service.createBackingProps(input, true);
    expect(result).toContain('var temp = value;');
    expect(result).toContain('if(_id != temp)');
  });
});
