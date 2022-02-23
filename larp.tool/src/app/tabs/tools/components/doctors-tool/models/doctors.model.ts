import { Disease } from "./disease.model";

export class DoctorsTool {
  name: string;
  diseases: Disease[];

  constructor(name: string, diseases: Disease[]) {
    this.name = name;
    this.diseases = diseases;
  }
}

export var testDisiases = new DoctorsTool('Инструмент врача', testDisiases);
