import { TestBed } from '@angular/core/testing';

import { GridFromClassService } from './grid-from-class.service';

describe('GridFromClassService', () => {
  let service: GridFromClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridFromClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const classInput =
  `public class Person
  {
      public int Id { get; set; }
      public string Name  { get; set; }
      public DateTime DateOfBirth { get; set; }
      public bool Registered { get; set; }
      public List<string> FavoriteFoods { get; set; }
  }`;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridFromClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set two-column layout properly', () => {
    const expectedLabel = `<Label Grid.Row="1" Grid.Column="1" Content="Id" />`;
    const expectedTextbox = `<TextBox x:Name="Id" Grid.Row="1" Grid.Column="2" />`;
    const result = service.createGridFromClass(classInput, true, 1, 1);
    expect(result).toContain(expectedLabel);
    expect(result).toContain(expectedTextbox);
  });

  it('should set one-column layout properly', () => {
    const expectedLabel = `<Label Grid.Row="1" Grid.Column="1" Content="Id" />`;
    const expectedTextbox = `<TextBox x:Name="Id" Grid.Row="2" Grid.Column="1" />`;
    const result = service.createGridFromClass(classInput, false, 1, 1);
    expect(result).toContain(expectedLabel);
    expect(result).toContain(expectedTextbox);
  });
});
