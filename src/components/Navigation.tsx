import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Apple, Utensils, Scale, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progresso' },
    { id: 'imc', icon: <Scale className="w-5 h-5" />, label: 'IMC' },
    { id: 'food', icon: <Apple className="w-5 h-5" />, label: 'Porções' },
    { id: 'calories', icon: <Calculator className="w-5 h-5" />, label: 'Calorias' },
    { id: 'meal', icon: <Utensils className="w-5 h-5" />, label: 'Plano Alimentar' }
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg p-2 mb-6 overflow-x-auto">
      <ul className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1 min-w-[120px]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(tab.id)}
              className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span className="font-medium whitespace-nowrap">{tab.label}</span>
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;