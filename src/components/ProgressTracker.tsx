import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import { format, parseISO, addDays } from 'date-fns';
import { useNutritionStore } from '../store/nutritionStore';
import { Target, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const ProgressTracker = () => {
  const {
    startDate,
    endDate,
    targetWeight,
    weightEntries,
    mealLogs,
    setDates,
    setTargetWeight,
    addWeightEntry,
    logMeal,
    getProgress
  } = useNutritionStore();

  const [newWeight, setNewWeight] = React.useState('');
  const progress = getProgress();

  const handleStartProgram = () => {
    const start = format(new Date(), 'yyyy-MM-dd');
    const end = format(addDays(new Date(), 90), 'yyyy-MM-dd');
    setDates(start, end);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-gray-800">Acompanhamento do Progresso</h2>
        </div>
        {progress > 0 && (
          <div className="text-sm font-medium text-indigo-600">
            {progress.toFixed(1)}% concluído
          </div>
        )}
      </div>

      {!startDate ? (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Comece seu programa de nutrição
          </h3>
          <div className="space-y-4 max-w-sm mx-auto">
            <input
              type="number"
              placeholder="Meta de peso (kg)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
            />
            <button
              onClick={handleStartProgram}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
            >
              Iniciar Programa
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-4">Registro de Peso</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="Peso atual (kg)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    addWeightEntry(parseFloat(newWeight));
                    setNewWeight('');
                  }}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                  Registrar
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-4">Progresso</h3>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {weightEntries.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightEntries}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(parseISO(date), 'dd/MM')}
                  />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip
                    labelFormatter={(date) => format(parseISO(date as string), 'dd/MM/yyyy')}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Calendário de Refeições</h3>
              <Calendar
                className="w-full rounded-lg border"
                tileClassName={({ date }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const log = mealLogs.find(l => l.date === dateStr);
                  return log ? (log.completed ? 'bg-green-100' : 'bg-red-100') : '';
                }}
                onClickDay={(date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  logMeal(dateStr, true);
                }}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-4">Informações do Programa</h3>
              <div className="space-y-2 text-sm">
                <p>Início: {format(parseISO(startDate), 'dd/MM/yyyy')}</p>
                <p>Término: {format(parseISO(endDate), 'dd/MM/yyyy')}</p>
                <p>Meta de peso: {targetWeight} kg</p>
                <p>Peso inicial: {weightEntries[0]?.weight} kg</p>
                <p>Peso atual: {weightEntries[weightEntries.length - 1]?.weight} kg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressTracker;