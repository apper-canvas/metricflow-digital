import mockNotifications from '@/services/mockData/notifications.json';

export const notificationService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockNotifications];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const notification = mockNotifications.find(n => n.Id === id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return { ...notification };
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newNotification = {
      Id: Math.max(...mockNotifications.map(n => n.Id)) + 1,
      ...data,
      timestamp: new Date().toISOString(),
      read: false
    };
    mockNotifications.push(newNotification);
    return { ...newNotification };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockNotifications.findIndex(n => n.Id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }
    mockNotifications[index] = { ...mockNotifications[index], ...data };
    return { ...mockNotifications[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockNotifications.findIndex(n => n.Id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }
    mockNotifications.splice(index, 1);
    return { success: true };
  }
};