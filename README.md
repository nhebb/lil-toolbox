# Li'l Toolbox
## A little toolbox of WPF-related utilities

This project is a rewrite of some desktop utilities that I created when creating WPF apps. My primary objective was just to learn the basics of Angular and TypeScript, but hopefully someone will find these useful.

Live Demo (Github pages): https://nhebb.github.io/lil-toolbox

## Create XAML Grid from Class
Takes a C# POCO and generates a baseline XAML grid. It is intended to be used as a starting point, with control types changed as needed.

Sample input:
```
public class Person
{
    public int Id { get; set; }
    public string Name  { get; set; }
    public DateTime DateOfBirth { get; set; }
    public bool Registered { get; set; }
    public List<string> FavoriteFoods { get; set; }
}
```

Sample output for two-column layout with first row and column set to 1:
```
<Label Grid.Row="1" Grid.Column="1" Content="Id" />
<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
<Label Grid.Row="2" Grid.Column="1" Content="Name" />
<TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
<Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
<Label Grid.Row="4" Grid.Column="1" Content="Registered" />
<CheckBox x:Name="Registered" Grid.Row="4" Grid.Column="2" />
<Label Grid.Row="5" Grid.Column="1" Content="Favorite Foods" />
<TextBox x:Name="FavoriteFoods" Grid.Row="5" Grid.Column="2" />
```

## Offset XAML Grid.Row / Column
Used to insert or delete rows or columns from a XAML Grid. Given a starting index and an offset value, you can quickly shift rows up or down, and columns left or right.

Sample input with an offset of 2, starting at index 4:
```
<Label Grid.Row="1" Grid.Column="1" Content="Id" />
<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
<Label Grid.Row="2" Grid.Column="1" Content="Name" />
<TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
<Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
<Label Grid.Row="4" Grid.Column="1" Content="Registered" />
<CheckBox x:Name="Registered" Grid.Row="4" Grid.Column="2" />
<Label Grid.Row="5" Grid.Column="1" Content="Favorite Foods" />
<ListBox x:Name="FavoriteFoods" Grid.Row="5" Grid.Column="2">...</ListBox>
```

Sample output:
```
<Label Grid.Row="1" Grid.Column="1" Content="Id" />
<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
<Label Grid.Row="2" Grid.Column="1" Content="Name" />
<TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
<Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
<Label Grid.Row="6" Grid.Column="1" Content="Registered" />
<CheckBox x:Name="Registered" Grid.Row="6" Grid.Column="2" />
<Label Grid.Row="7" Grid.Column="1" Content="Favorite Foods" />
<ListBox x:Name="FavoriteFoods" Grid.Row="7" Grid.Column="2">...</ListBox>
```

## Create Backing Properties from XAML Grid (Caliburn.Micro)
Creates the backing properties for binding controls in a given XAML input to the View Model, for use with _Caliburn.Micro_. It makes assumptions about the appropriate data type based on the control type. Resulting code should be audited / edited after generation.

Sample input:
```
<Label Grid.Row="1" Grid.Column="1" Content="Id" />
<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />
<Label Grid.Row="2" Grid.Column="1" Content="Name" />
<TextBox x:Name="Name" Grid.Row="2" Grid.Column="2" />
<Label Grid.Row="3" Grid.Column="1" Content="Date Of Birth" />
<DatePicker x:Name="DateOfBirth" Grid.Row="3" Grid.Column="2" />
<Label Grid.Row="4" Grid.Column="1" Content="Registered" />
<CheckBox x:Name="Registered" Grid.Row="4" Grid.Column="2" />
<Label Grid.Row="5" Grid.Column="1" Content="Favorite Foods" />
<ListBox x:Name="FavoriteFoods" Grid.Row="5" Grid.Column="2" />
<Button x:Name="Save" Grid.Row="6" Grid.Column="1">Save</Button>
```

Sample output:
```
private string _id;
public string Id
{
    get { return _id; }
    set
    {
        if(_id != value)
        {
            _id = value;
            NotifyOfPropertyChange(() => Id);
        }
    }
}

private string _name;
public string Name
{
    get { return _name; }
    set
    {
        if(_name != value)
        {
            _name = value;
            NotifyOfPropertyChange(() => Name);
        }
    }
}

private DateTime _dateOfBirth;
public DateTime DateOfBirth
{
    get { return _dateOfBirth; }
    set
    {
        if(_dateOfBirth != value)
        {
            _dateOfBirth = value;
            NotifyOfPropertyChange(() => DateOfBirth);
        }
    }
}

private bool _registered;
public bool Registered
{
    get { return _registered; }
    set
    {
        if(_registered != value)
        {
            _registered = value;
            NotifyOfPropertyChange(() => Registered);
        }
    }
}

private BindableCollection<FavoriteFoods> _favoriteFoods;
public BindableCollection<FavoriteFoods> FavoriteFoods
{
    get { return _favoriteFoods; }
    set
    {
        _favoriteFoods = value;
        NotifyOfPropertyChange(() => FavoriteFoods);
    }
}

private FavoriteFoods _selectedFavoriteFoods;
public FavoriteFoods SelectedFavoriteFoods
{
    get { return _selectedFavoriteFoods; }
    set
    {
        if(_selectedFavoriteFoods != value)
        {
            _selectedFavoriteFoods = value;
            NotifyOfPropertyChange(() => SelectedFavoriteFoods);
        }
    }
}

public bool CanSave()
{
    throw new NotImplementedException();
}

public void Save()
{
    throw new NotImplementedException();
}
```

## Swap Assignment
This tool swaps assignment around the equals (=) sign, e.g.:

Sample input:
```
person.Name  = name;
person.DateOfBirth = dob;
person.Registered = registered;
person.FavoriteFoods = favoriteFoods;
```

Sample output:
```
name = person.Name;
dob = person.DateOfBirth;
registered = person.Registered;
favoriteFoods = person.FavoriteFoods;
```
