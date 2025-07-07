import mockUsers from '@/services/mockData/users.json';

export const userService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockUsers];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = mockUsers.find(u => u.Id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newUser = {
      Id: Math.max(...mockUsers.map(u => u.Id)) + 1,
      ...data,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return { ...newUser };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers[index] = { ...mockUsers[index], ...data };
    return { ...mockUsers[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers.splice(index, 1);
    return { success: true };
  }
};