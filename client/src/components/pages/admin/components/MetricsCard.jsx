const MetricsCard = ({ title, value, color }) => {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
        <p className={`text-4xl font-bold mt-2 ${color} dark:text-gray-300`}>{value}</p>
      </div>
    );
  };
  
  export default MetricsCard;
  