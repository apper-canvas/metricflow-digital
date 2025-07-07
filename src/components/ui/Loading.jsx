import { motion } from 'framer-motion';

const Loading = ({ type = 'dashboard' }) => {
  const DashboardSkeleton = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-6" />
          <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-6" />
          <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );

  const FormSkeleton = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-6" />
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'table':
        return <TableSkeleton />;
      case 'form':
        return <FormSkeleton />;
      default:
        return <DashboardSkeleton />;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderSkeleton()}
    </div>
  );
};

export default Loading;