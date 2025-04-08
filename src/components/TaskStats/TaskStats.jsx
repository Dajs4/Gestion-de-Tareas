function TaskStats({ total, pending }) {
  // Calcular porcentaje de tareas completadas
  const completedPercentage = total > 0 ? Math.round(((total - pending) / total) * 100) : 0;
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16">
          {/* Círculo de fondo */}
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E0E7FF"
              strokeWidth="3"
              strokeDasharray="100, 100"
            />
            {/* Círculo de progreso */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#6366F1"
              strokeWidth="3"
              strokeDasharray={`${completedPercentage}, 100`}
            />
          </svg>
          {/* Texto en el centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-indigo-700 font-bold text-sm">{completedPercentage}%</span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-semibold">{pending}</span>
            <span>pendientes de</span>
            <span className="font-semibold">{total}</span>
            <span>tareas</span>
          </div>
          
          <div className="mt-1 flex gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 inline-block rounded-full bg-indigo-600"></span>
              <span className="text-gray-500">{total - pending} completadas</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 inline-block rounded-full bg-indigo-200"></span>
              <span className="text-gray-500">{pending} pendientes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;