import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MetricCard from '@/components/molecules/MetricCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { metricService } from '@/services/api/metricService';

const MetricsGrid = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await metricService.getAll();
      setMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMetrics} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard
              title={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
              gradient={index % 2 === 0}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MetricsGrid;