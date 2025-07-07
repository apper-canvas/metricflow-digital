import { motion } from 'framer-motion';
import SettingsForm from '@/components/organisms/SettingsForm';

const Settings = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your profile, preferences, and account settings.
        </p>
      </motion.div>

      <SettingsForm />
    </div>
  );
};

export default Settings;