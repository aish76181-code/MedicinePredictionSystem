import { useNavigate } from 'react-router-dom';
import { Activity, Stethoscope, Shield, Zap } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-800">
              Predictive Healthcare Analytics
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Advanced AI-powered symptom analysis for early disease detection and personalized health recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to Your Health Assistant</h2>
            <p className="text-blue-100">
              Get instant predictions based on your symptoms with recommended treatments and precautions
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <Stethoscope className="w-12 h-12 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Symptom Analysis</h3>
                <p className="text-sm text-gray-600">
                  Enter your symptoms and get accurate disease predictions
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
                <Shield className="w-12 h-12 text-cyan-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Treatment Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Receive both modern and alternative medicine suggestions
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
                <Zap className="w-12 h-12 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
                <p className="text-sm text-gray-600">
                  Get immediate insights with health warnings and doctor advice
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/diagnosis')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Start Diagnosis
              </button>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong className="text-yellow-800">Medical Disclaimer:</strong> This tool provides informational predictions only and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
