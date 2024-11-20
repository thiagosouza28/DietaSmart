import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface BMICalculatorProps {
  onCalculate: (weight: number, bmi: number) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ onCalculate }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    
    if (weightNum && heightNum) {
      const bmiValue = weightNum / (heightNum * heightNum);
      const roundedBMI = parseFloat(bmiValue.toFixed(1));
      setBmi(roundedBMI);
      
      if (bmiValue < 18.5) setStatus('Abaixo do peso');
      else if (bmiValue < 24.9) setStatus('Peso normal');
      else if (bmiValue < 29.9) setStatus('Sobrepeso');
      else setStatus('Obesidade');

      onCalculate(weightNum, roundedBMI);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Calculadora de IMC</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 70"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 170"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateBMI}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Calcular IMC
        </motion.button>
        
        {bmi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-center text-gray-800">
              Seu IMC é: <span className="font-bold text-xl">{bmi}</span>
            </p>
            <p className="text-center text-gray-600 mt-1">
              Status: <span className="font-medium">{status}</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BMICalculator;