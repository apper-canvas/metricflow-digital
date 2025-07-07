import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon,
  gradient = false 
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-6 ${gradient ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <ApperIcon name={icon} className="h-5 w-5 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <motion.h3 
            className="text-3xl font-bold text-gray-900 number-counter"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.h3>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-green-600' : 
              isNegative ? 'text-red-600' : 'text-gray-500'
            }`}>
              <ApperIcon 
                name={isPositive ? "TrendingUp" : isNegative ? "TrendingDown" : "Minus"} 
                className="h-4 w-4" 
              />
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;