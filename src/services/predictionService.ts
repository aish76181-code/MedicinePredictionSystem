import { supabase } from '../lib/supabaseClient';
import { Disease, PredictionResult } from '../types';

export const predictDisease = async (
  userSymptoms: string[]
): Promise<PredictionResult | null> => {
  const { data: diseases, error } = await supabase
    .from('diseases')
    .select('*');

  if (error || !diseases || diseases.length === 0) {
    console.error('Error fetching diseases:', error);
    return null;
  }

  let bestMatch: PredictionResult | null = null;
  let highestScore = 0;

  for (const disease of diseases) {
    const matchingSymptoms = userSymptoms.filter(symptom =>
      disease.symptoms.some(
        (diseaseSymptom: string) =>
          diseaseSymptom.toLowerCase() === symptom.toLowerCase()
      )
    );

    const matchScore =
      (matchingSymptoms.length / Math.max(userSymptoms.length, disease.symptoms.length)) * 100;

    if (matchScore > highestScore && matchingSymptoms.length > 0) {
      highestScore = matchScore;
      bestMatch = {
        disease: disease as Disease,
        matchScore,
      };
    }
  }

  return bestMatch;
};

export const saveDiagnosis = async (
  symptoms: string[],
  diseaseId: string | null,
  diseaseName: string | null
): Promise<boolean> => {
  const { error } = await supabase.from('user_diagnoses').insert({
    symptoms_entered: symptoms,
    predicted_disease_id: diseaseId,
    predicted_disease_name: diseaseName,
  });

  if (error) {
    console.error('Error saving diagnosis:', error);
    return false;
  }

  return true;
};

export const getAllDiseases = async (): Promise<Disease[]> => {
  const { data, error } = await supabase
    .from('diseases')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching diseases:', error);
    return [];
  }

  return data as Disease[];
};
