import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import TeamMemberRow from '@/components/molecules/TeamMemberRow';
import ApperIcon from '@/components/ApperIcon';
import { teamService } from '@/services/api/teamService';

const TeamTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamService.getAll();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await teamService.delete(id);
        setMembers(members.filter(member => member.Id !== id));
        toast.success('Team member removed successfully');
      } catch (err) {
        toast.error('Failed to remove team member');
      }
    }
  };

  const handleUpdateRole = async (id) => {
    const member = members.find(m => m.Id === id);
    const newRole = prompt('Enter new role:', member.role);
    
    if (newRole && newRole !== member.role) {
      try {
        const updatedMember = await teamService.update(id, { ...member, role: newRole });
        setMembers(members.map(m => m.Id === id ? updatedMember : m));
        toast.success('Role updated successfully');
      } catch (err) {
        toast.error('Failed to update role');
      }
    }
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMembers} />;
  }

  if (members.length === 0) {
    return (
      <Empty
        title="No team members found"
        description="Start building your team by inviting members to join your organization"
        actionText="Invite Member"
        icon="Users"
        onAction={() => toast.info('Invite functionality would be implemented here')}
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <Button
            onClick={() => toast.info('Invite functionality would be implemented here')}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Invite Member</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {members.map((member) => (
                <TeamMemberRow
                  key={member.Id}
                  member={member}
                  onRemove={handleRemoveMember}
                  onUpdateRole={handleUpdateRole}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TeamTable;