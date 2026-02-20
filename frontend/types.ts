
export interface PatientProfile {
  age: number;
  bmi: number;
  sex: 'male' | 'female';
  children: number;
  smoker: 'yes' | 'no';
  region: 'northeast' | 'northwest' | 'southeast' | 'southwest';
}

export interface PredictionResult {
  estimatedCharges: number;
  riskIndex: number;
  confidence: number;
  impactFactors: {
    name: string;
    impact: number;
  }[];
}
