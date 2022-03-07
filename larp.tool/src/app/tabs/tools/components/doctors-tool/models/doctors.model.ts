import { Disease } from "./disease.model";

export class DoctorsTool {
  name: string;
  path: string;
  diseases: Disease[];

  constructor(name: string, path: string, diseases: Disease[]) {
    this.name = name;
    this.path = path;
    this.diseases = diseases;
  }
}

export var testDisiases = new DoctorsTool('Инструмент врача', './doctors', testDisiases);
