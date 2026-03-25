export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  medicines: string[];
  alternative_medicines: string[];
  precautions: string[];
  doctor_advice: string;
  severity: 'mild' | 'moderate' | 'severe';
  created_at: string;
}

export interface UserDiagnosis {
  id: string;
  symptoms_entered: string[];
  predicted_disease_id: string | null;
  predicted_disease_name: string | null;
  created_at: string;
}

export interface PredictionResult {
  disease: Disease;
  matchScore: number;
}
