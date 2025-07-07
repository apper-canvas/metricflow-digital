import { motion } from 'framer-motion';
import MetricsGrid from '@/components/organisms/MetricsGrid';
import DashboardCharts from '@/components/organisms/DashboardCharts';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome to your business intelligence dashboard. Monitor your key metrics and track performance.
        </p>
      </motion.div>

      <MetricsGrid />
      
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;