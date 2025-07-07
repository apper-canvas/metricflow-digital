import mockTeam from '@/services/mockData/team.json';

export const teamService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockTeam];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const member = mockTeam.find(m => m.Id === id);
    if (!member) {
      throw new Error('Team member not found');
    }
    return { ...member };
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newMember = {
      Id: Math.max(...mockTeam.map(m => m.Id)) + 1,
      ...data,
      joinedDate: new Date().toISOString(),
      status: 'pending'
    };
    mockTeam.push(newMember);
    return { ...newMember };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTeam.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error('Team member not found');
    }
    mockTeam[index] = { ...mockTeam[index], ...data };
    return { ...mockTeam[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockTeam.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error('Team member not found');
    }
    mockTeam.splice(index, 1);
    return { success: true };
  }
};