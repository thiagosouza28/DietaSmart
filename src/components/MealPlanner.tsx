import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sun, Moon, Cookie } from 'lucide-react';

interface MealPlanProps {
  weight: number;
  bmi: number;
}

const calculateCalories = (weight: number, bmi: number) => {
  let baseCalories = weight * 24;
  
  if (bmi < 18.5) {
    return baseCalories + 500; // Superávit calórico para ganho de peso
  } else if (bmi > 24.9) {
    return baseCalories - 500; // Déficit calórico para perda de peso
  }
  return baseCalories; // Manutenção
};

const MealPlanner: React.FC<MealPlanProps> = ({ weight, bmi }) => {
  const dailyCalories = calculateCalories(weight, bmi);
  
  const mealPlan = {
    breakfast: {
      icon: <Coffee className="w-5 h-5" />,
      title: "Café da Manhã",
      time: "6:00 - 8:00",
      calories: Math.round(dailyCalories * 0.25),
      suggestions: [
        bmi > 24.9 ? "1 fatia de pão integral" : "2 fatias de pão integral",
        "1 ovo cozido",
        "1 fatia de queijo branco",
        "1 xícara de café com leite desnatado",
        "1 fruta (maçã ou banana)"
      ]
    },
    lunch: {
      icon: <Sun className="w-5 h-5" />,
      title: "Almoço",
      time: "12:00 - 13:00",
      calories: Math.round(dailyCalories * 0.35),
      suggestions: [
        `${Math.round(weight * 0.8)}g de frango grelhado ou peixe`,
        `${Math.round(weight * 1)}g de arroz integral`,
        `${Math.round(weight * 0.5)}g de feijão`,
        "Salada à vontade (folhas verdes, tomate, cenoura)",
        "1 colher de sobremesa de azeite"
      ]
    },
    snack: {
      icon: <Cookie className="w-5 h-5" />,
      title: "Lanche da Tarde",
      time: "15:00 - 16:00",
      calories: Math.round(dailyCalories * 0.15),
      suggestions: [
        "1 iogurte natural",
        "1 punhado de oleaginosas",
        "1 fruta",
        bmi < 18.5 ? "+ 1 barra de cereal integral" : ""
      ].filter(Boolean)
    },
    dinner: {
      icon: <Moon className="w-5 h-5" />,
      title: "Jantar",
      time: "19:00 - 20:00",
      calories: Math.round(dailyCalories * 0.25),
      suggestions: [
        `${Math.round(weight * 0.6)}g de proteína magra`,
        "1 porção de legumes cozidos",
        `${Math.round(weight * 0.7)}g de batata doce ou aipim`,
        "Salada à vontade",
        "1 colher de sobremesa de azeite"
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg col-span-2"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Seu Plano Alimentar Personalizado
      </h2>
      <p className="text-gray-600 mb-6">
        Calorias diárias recomendadas: <span className="font-bold">{Math.round(dailyCalories)} kcal</span>
        {bmi > 24.9 && " (déficit calórico para perda de peso)"}
        {bmi < 18.5 && " (superávit calórico para ganho de peso)"}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(mealPlan).map(([key, meal]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                {meal.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{meal.title}</h3>
                <p className="text-sm text-gray-500">{meal.time}</p>
              </div>
              <div className="ml-auto text-sm font-medium text-blue-600">
                {meal.calories} kcal
              </div>
            </div>
            <ul className="space-y-2">
              {meal.suggestions.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MealPlanner;