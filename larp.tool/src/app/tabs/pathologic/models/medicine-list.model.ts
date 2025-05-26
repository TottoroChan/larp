export interface MedicineList {
  meds: Medicine[];
  limits: Limits;
}

interface Limits {
  antibiotics: number;
  immunes: number;
}

export interface Medicine {
  type: 'антибиотик' | 'иммуник' | 'обезболивающее' | 'антисептик';
  value: string;
  power: number[];
}
