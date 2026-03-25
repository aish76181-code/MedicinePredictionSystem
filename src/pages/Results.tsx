import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Pill,
  Leaf,
  ShieldAlert,
  Stethoscope,
  Activity,
  Home,
  AlertCircle,
} from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { predictDisease, saveDiagnosis } from '../services/predictionService';
import { Disease } from '../types';

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [disease, setDisease] = useState<Disease | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  const [error, setError] = useState('');

  const symptoms = location.state?.symptoms as string[] | undefined;

  useEffect(() => {
    if (!symptoms || symptoms.length === 0) {
      navigate('/diagnosis');
      return;
    }

    const analyzeSymptoms = async () => {
      setLoading(true);
      try {
        const result = await predictDisease(symptoms);

        if (result) {
          setDisease(result.disease);
          setMatchScore(result.matchScore);
          await saveDiagnosis(symptoms, result.disease.id, result.disease.name);
        } else {
          setError('No matching disease found. Please try different symptoms or consult a doctor.');
        }
      } catch (err) {
        console.error('Prediction error:', err);
        setError('An error occurred during prediction. Please try again.');
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    analyzeSymptoms();
  }, [symptoms, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !disease) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/diagnosis')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Diagnosis Results</h1>
            <p className="text-gray-600">Based on your reported symptoms</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-100">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{disease.name}</h2>
                <p className="text-sm text-gray-500">
                  Match Confidence: {matchScore.toFixed(1)}%
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getSeverityColor(
                  disease.severity
                )}`}
              >
                {disease.severity.toUpperCase()}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Your Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recommended Medicines</h3>
              </div>
              <ul className="space-y-2">
                {disease.medicines.map((medicine, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{medicine}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Alternative Remedies</h3>
              </div>
              <ul className="space-y-2">
                {disease.alternative_medicines.map((remedy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ShieldAlert className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Precautions & Health Warnings</h3>
            </div>
            <ul className="space-y-2">
              {disease.precautions.map((precaution, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{precaution}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white mb-6">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Doctor's Advice</h3>
                <p className="text-blue-50 leading-relaxed">{disease.doctor_advice}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-800 mb-2">Important Medical Disclaimer</h4>
                <p className="text-sm text-red-700 leading-relaxed">
                  This prediction is based on an automated system and should not be considered a
                  substitute for professional medical advice, diagnosis, or treatment. Always seek
                  the advice of your physician or other qualified health provider with any
                  questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/diagnosis')}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-5 h-5" />
              New Diagnosis
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
