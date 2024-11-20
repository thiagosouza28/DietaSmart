import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const foodDatabase: FoodItem[] = [
  { name: 'Arroz branco cozido', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3 },
  { name: 'Feijão carioca cozido', calories: 77, protein: 4.8, carbs: 14, fat: 0.5 },
  { name: 'Peito de frango grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Batata doce cozida', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
  { name: 'Ovo cozido', calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6 },
  { name: 'Aveia em flocos', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { name: 'Banana prata', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: 'Pão integral', calories: 247, protein: 13, carbs: 41.3, fat: 3.4 }
];

const CaloriesCalculator = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem>(foodDatabase[0]);
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculateNutrients = () => {
    const weightNum = parseFloat(weight);
    if (weightNum) {
      const multiplier = weightNum / 100;
      setResults({
        calories: Math.round(selectedFood.calories * multiplier),
        protein: parseFloat((selectedFood.protein * multiplier).toFixed(1)),
        carbs: parseFloat((selectedFood.carbs * multiplier).toFixed(1)),
        fat: parseFloat((selectedFood.fat * multiplier).toFixed(1))
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-gray-800">Calorias e Macronutrientes</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecione o alimento
          </label>
          <select
            value={selectedFood.name}
            onChange={(e) => setSelectedFood(foodDatabase.find(f => f.name === e.target.value) || foodDatabase[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {foodDatabase.map((food) => (
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: 100"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateNutrients}
          className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors"
        >
          Calcular Nutrientes
        </motion.button>

        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 grid grid-cols-2 gap-4"
          >
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Calorias</p>
              <p className="text-2xl font-bold text-purple-700">{results.calories} kcal</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Proteínas</p>
              <p className="text-2xl font-bold text-blue-700">{results.protein}g</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Carboidratos</p>
              <p className="text-2xl font-bold text-green-700">{results.carbs}g</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Gorduras</p>
              <p className="text-2xl font-bold text-yellow-700">{results.fat}g</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CaloriesCalculator;