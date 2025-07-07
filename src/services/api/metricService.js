import mockMetrics from '@/services/mockData/metrics.json';

export const metricService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockMetrics];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const metric = mockMetrics.find(m => m.Id === id);
    if (!metric) {
      throw new Error('Metric not found');
    }
    return { ...metric };
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newMetric = {
      Id: Math.max(...mockMetrics.map(m => m.Id)) + 1,
      ...data,
      createdAt: new Date().toISOString()
    };
    mockMetrics.push(newMetric);
    return { ...newMetric };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockMetrics.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error('Metric not found');
    }
    mockMetrics[index] = { ...mockMetrics[index], ...data };
    return { ...mockMetrics[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockMetrics.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error('Metric not found');
    }
    mockMetrics.splice(index, 1);
    return { success: true };
  }
};