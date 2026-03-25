import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, AlertCircle, ChevronDown, X } from 'lucide-react';

const AVAILABLE_SYMPTOMS = [
  'Fever',
  'Cough',
  'Headache',
  'Fatigue',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Body Ache',
  'Sore Throat',
  'Runny Nose',
  'Shortness of Breath',
  'Chest Pain',
  'Dizziness',
  'Loss of Appetite',
  'Weakness',
  'Chills',
  'Sweating',
  'Muscle Pain',
  'Joint Pain',
  'Abdominal Pain',
  'Back Pain',
  'Neck Pain',
  'Sneezing',
  'Congestion',
  'Rash',
  'Itching',
  'Swelling',
  'Red Eyes',
  'Sensitivity to Light',
  'Confusion',
];

export const SymptomInput = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');

  const toggleSymptom = (symptom: string) => {
    setError('');
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    navigate('/results', { state: { symptoms: selectedSymptoms } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <ClipboardList className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Enter Your Symptoms
            </h1>
            <p className="text-gray-600">
              Select all symptoms you are currently experiencing
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Symptoms
              </label>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <span className="text-gray-700">
                    {selectedSymptoms.length > 0
                      ? `${selectedSymptoms.length} symptom(s) selected`
                      : 'Click to select symptoms'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {AVAILABLE_SYMPTOMS.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                          selectedSymptoms.includes(symptom)
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        {symptom}
                        {selectedSymptoms.includes(symptom) && (
                          <span className="text-blue-600 font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Selected Symptoms
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                    >
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="hover:bg-white/20 rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Analyze Symptoms
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-blue-800">Tip:</strong> Be as specific as possible when selecting your symptoms. The more accurate your symptom selection, the better the prediction will be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
