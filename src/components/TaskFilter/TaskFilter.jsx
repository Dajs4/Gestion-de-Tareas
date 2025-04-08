function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="mb-6">
      <div className="bg-gray-50 p-1.5 rounded-xl flex justify-center shadow-sm">
        <div className="grid grid-cols-3 w-full max-w-md">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              filter === "all"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Todas</span>
            </div>
          </button>

          <button
            onClick={() => onFilterChange("active")}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              filter === "active"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Activas</span>
            </div>
          </button>

          <button
            onClick={() => onFilterChange("completed")}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              filter === "completed"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Completadas</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;