export interface MedsList {
  meds: MedsItem[];
  limits: MedsLimits;
}

interface MedsLimits {
  antibiotics: number;
  immunes: number;
}

export interface MedsItem {
  type: 'антибиотик' | 'иммуник' | 'обезболивающее' | 'антисептик';
  value: string;
}
