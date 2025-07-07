import { motion } from 'framer-motion';
import TeamTable from '@/components/organisms/TeamTable';

const Team = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
        <p className="text-gray-600">
          Manage your team members, roles, and permissions in one place.
        </p>
      </motion.div>

      <TeamTable />
    </div>
  );
};

export default Team;