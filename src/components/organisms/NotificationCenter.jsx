import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import NotificationItem from '@/components/molecules/NotificationItem';
import ApperIcon from '@/components/ApperIcon';
import { notificationService } from '@/services/api/notificationService';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const notification = notifications.find(n => n.Id === id);
      const updatedNotification = await notificationService.update(id, { ...notification, read: true });
      setNotifications(notifications.map(n => n.Id === id ? updatedNotification : n));
      toast.success('Notification marked as read');
    } catch (err) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      const updatePromises = unreadNotifications.map(n => 
        notificationService.update(n.Id, { ...n, read: true })
      );
      await Promise.all(updatePromises);
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'read':
        return notification.read;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadNotifications} />;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="primary">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <ApperIcon name="CheckCheck" className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          <Button
            variant={filter === 'read' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Read
          </Button>
        </div>

        {filteredNotifications.length === 0 ? (
          <Empty
            title="No notifications"
            description="You're all caught up! No notifications match your current filter."
            icon="Bell"
            showAction={false}
          />
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.Id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationCenter;