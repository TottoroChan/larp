export interface CalculationResult {
  isCalculated: boolean;
  result: string;
  isDead: boolean;
  healingTable: HealingTable[][]
}

export interface HealingTable {
  id: number;
  symptom: string;
  isPair: boolean;
  requiredPower: number;
  layer: number;
  isLast: boolean;
  isHealed: boolean;
  result: string;
}

