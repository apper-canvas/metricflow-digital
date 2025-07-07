import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const TeamMemberRow = ({ member, onRemove, onUpdateRole }) => {
  const { id, name, email, role, status, joinedDate, avatar } = member;

  const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'warning';
      case 'member':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: '#f9fafb' }}
      className="transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10">
            {avatar ? (
              <img 
                className="h-10 w-10 rounded-full" 
                src={avatar} 
                alt={name} 
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getRoleColor()} size="sm">
          {role}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getStatusColor()} size="sm">
          {status}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {format(new Date(joinedDate), 'MMM d, yyyy')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdateRole(id)}
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-700"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </motion.tr>
  );
};

export default TeamMemberRow;