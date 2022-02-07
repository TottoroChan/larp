export class Resource {
  id!: string | ' ';
  name: string;
  description: string;
  min: number;
  max: number;
  step: number;
  value: number;

  constructor( 
    id: string,
    name: string,
    description: string,
    min: number,
    max: number,
    step: number,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = value ?? 0;
  }
}
