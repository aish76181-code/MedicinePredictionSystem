import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
        <p className="mt-4 text-gray-700 font-medium">Analyzing symptoms...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we predict your condition</p>
      </div>
    </div>
  );
};
