export class Disease {
  name: string;
  hash: string;

  constructor(name: string, hash: string) {
    this.name = name;
    this.hash = hash;
  }
}

export var testDisiases = [
  new Disease('Test1', 'Test1'),
  new Disease('Test2', 'Test2'),
];
