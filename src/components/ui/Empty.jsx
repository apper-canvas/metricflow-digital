import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  actionText = "Add Item",
  onAction,
  icon = "Database",
  showAction = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-xl card-shadow"
    >
      <div className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
        <ApperIcon name={icon} className="h-12 w-12 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-sm">{description}</p>
      
      {showAction && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;