import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import Navigation from './components/Navigation';
import BMICalculator from './components/BMICalculator';
import FoodCalculator from './components/FoodCalculator';
import CaloriesCalculator from './components/CaloriesCalculator';
import MealPlanner from './components/MealPlanner';
import ProgressTracker from './components/ProgressTracker';

function App() {
  const [activeTab, setActiveTab] = useState('progress');
  const [userStats, setUserStats] = useState<{ weight: number; bmi: number } | null>(null);

  const handleBMICalculate = (weight: number, bmi: number) => {
    setUserStats({ weight, bmi });
    setActiveTab('meal');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return <ProgressTracker />;
      case 'imc':
        return <BMICalculator onCalculate={handleBMICalculate} />;
      case 'food':
        return <FoodCalculator />;
      case 'calories':
        return <CaloriesCalculator />;
      case 'meal':
        return userStats ? (
          <MealPlanner weight={userStats.weight} bmi={userStats.bmi} />
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <p className="text-gray-600">
              Calcule primeiro seu IMC para receber um plano alimentar personalizado
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Utensils className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Calculadora Nutricional
            </h1>
          </div>
          <p className="text-gray-600">
            Calcule seu IMC, porções e receba um plano alimentar personalizado
          </p>
        </motion.div>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="container mx-auto"
        >
          {renderContent()}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          © 2024 Calculadora Nutricional - Sua saúde em primeiro lugar
        </motion.footer>
      </div>
    </div>
  );
}

export default App;