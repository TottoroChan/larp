export class Disease {
  name: string;
  code: string;
  description: string;

  constructor(name: string, code: string, description: string) {
    this.name = name;
    this.code = code;
    this.description = description;
  }
}

export var testDisiases = [
  new Disease('1', 'A', 'Это болезнь номер 1'),
  new Disease('2', 'B', 'Это болезнь номер 2'),
  new Disease('3', 'C', 'Это болезнь номер 3'),
];
