import { Disease } from '@app/tabs/tools/components/doctors-tool/models/disease.model';

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

export const testDisiases = new DoctorsTool(
  'Инструмент врача',
  './doctors',
  []
);
