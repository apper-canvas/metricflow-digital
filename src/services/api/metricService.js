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
  },

  exportChartData: async (chartData, chartType, format) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const transformedData = transformChartDataForExport(chartData, chartType);
      return { data: transformedData, format, chartType };
    } catch (error) {
      throw new Error(`Export failed: ${error.message}`);
    }
  }
};

const transformChartDataForExport = (chartData, chartType) => {
  switch (chartType) {
    case 'revenue':
      return chartData.series[0].data.map((value, index) => ({
        Month: chartData.options.xaxis.categories[index],
        Revenue: `$${value}k`
      }));
    
    case 'users':
      return chartData.series.map((value, index) => ({
        Category: chartData.options.labels[index],
        Count: value,
        Percentage: `${((value / chartData.series.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%`
      }));
    
    case 'activity':
      return chartData.options.xaxis.categories.map((month, index) => ({
        Month: month,
        'Active Users': chartData.series[0].data[index],
        'Sessions': chartData.series[1].data[index]
      }));
    
    default:
      return [];
  }
};