import { motion } from 'framer-motion';
import SupportCenter from '@/components/organisms/SupportCenter';

const Support = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support</h1>
        <p className="text-gray-600">
          Get help and find answers to your questions.
        </p>
      </motion.div>

      <SupportCenter />
    </div>
  );
};

export default Support;