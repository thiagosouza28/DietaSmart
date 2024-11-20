import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Calculator } from 'lucide-react';

const commonFoods = [
  { name: 'Arroz cozido', gramsPerPortion: 100, caloriesPer100g: 130 },
  { name: 'Feijão cozido', gramsPerPortion: 80, caloriesPer100g: 77 },
  { name: 'Peito de frango grelhado', gramsPerPortion: 100, caloriesPer100g: 165 },
  { name: 'Batata doce cozida', gramsPerPortion: 100, caloriesPer100g: 86 },
  { name: 'Brócolis cozido', gramsPerPortion: 60, caloriesPer100g: 35 },
];

const FoodCalculator = () => {
  const [selectedFood, setSelectedFood] = useState(commonFoods[0]);
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ portions: number; calories: number } | null>(null);

  const calculateFood = () => {
    const weightNum = parseFloat(weight);
    if (weightNum) {
      const portions = weightNum / selectedFood.gramsPerPortion;
      const calories = (weightNum / 100) * selectedFood.caloriesPer100g;
      setResult({
        portions: parseFloat(portions.toFixed(1)),
        calories: Math.round(calories),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Apple className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">Calculadora de Porções</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecione o alimento
          </label>
          <select
            value={selectedFood.name}
            onChange={(e) => setSelectedFood(commonFoods.find(f => f.name === e.target.value) || commonFoods[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {commonFoods.map((food) => (
              <option key={food.name} value={food.name}>
                {food.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso (g)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: 150"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateFood}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          Calcular
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2"
          >
            <p className="text-gray-800">
              Porções: <span className="font-bold">{result.portions}</span>
            </p>
            <p className="text-gray-800">
              Calorias: <span className="font-bold">{result.calories} kcal</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodCalculator;