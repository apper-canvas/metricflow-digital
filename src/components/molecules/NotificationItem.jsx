import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const NotificationItem = ({ notification, onMarkAsRead, onAction }) => {
  const { id, type, title, message, timestamp, read } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        !read ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => !read && onMarkAsRead(id)}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${
          type === 'success' ? 'bg-green-100' :
          type === 'warning' ? 'bg-yellow-100' :
          type === 'error' ? 'bg-red-100' :
          type === 'info' ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <ApperIcon name={getIcon()} className={`h-4 w-4 ${
            type === 'success' ? 'text-green-600' :
            type === 'warning' ? 'text-yellow-600' :
            type === 'error' ? 'text-red-600' :
            type === 'info' ? 'text-blue-600' : 'text-gray-600'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <div className="flex items-center space-x-2">
              <Badge variant={getTypeColor()} size="sm">
                {type}
              </Badge>
              {!read && (
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-2">
            {format(new Date(timestamp), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;