import { motion } from 'framer-motion';
import NotificationCenter from '@/components/organisms/NotificationCenter';

const Notifications = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">
          Stay up to date with important updates and alerts.
        </p>
      </motion.div>

      <NotificationCenter />
    </div>
  );
};

export default Notifications;