# Li'l Toolbox
## A little toolbox of WPF-related utilities

<p>Github pages: https://github.com/nhebb/lil-toolbox

### Create XAML Grid from Class
Takes a C# POCO and generates a baseline XAML grid. It is intended to be used as a starting point, with control types changed as needed.

### Offset XAML Grid.Row / Column
Used to insert or delete rows or columns from a XAML Grid. Given a starting index and an offset value, you can quickly shift rows up or down, and columns left or right.

### Create Backing Properties from XAML Grid (Caliburn.Micro)
Creates the backing properties for binding controls in a given XAML input to the View Model. It makes assumptions about the appropriate data type based on the control type. Resulting code should be audited / edited after generation.

### Swap Assignment
This tool swaps assignment around the equals (=) sign, e.g.:

`class.Property = variable` => `variable = class.Property`.