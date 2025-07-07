import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { metricService } from '@/services/api/metricService'
import { exportService } from '@/services/api/exportService';
import { toast } from 'react-toastify';
const DashboardCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = {
        revenue: {
          series: [{
            name: 'Revenue',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 95, 120, 140]
          }],
          options: {
            chart: {
              type: 'line',
              height: 350,
              toolbar: { show: false }
            },
            colors: ['#6366F1'],
            stroke: {
              curve: 'smooth',
              width: 3
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                gradientToColors: ['#8B5CF6'],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.1,
                stops: [0, 100]
              }
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return "$" + val + "k"
                }
              }
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$" + val + "k"
                }
              }
            },
            grid: {
              borderColor: '#f1f5f9',
              strokeDashArray: 5
            }
          }
        },
        users: {
          series: [44, 55, 13, 43],
          options: {
            chart: {
              type: 'donut',
              height: 350
            },
            colors: ['#6366F1', '#8B5CF6', '#EC4899', '#10B981'],
            labels: ['New Users', 'Returning Users', 'Inactive Users', 'Premium Users'],
            legend: {
              position: 'bottom'
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '65%'
                }
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
        },
        activity: {
          series: [{
            name: 'Active Users',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 69, 72, 78]
          }, {
            name: 'Sessions',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 120, 115, 125]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              toolbar: { show: false }
            },
            colors: ['#6366F1', '#EC4899'],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {
              title: {
                text: 'Count'
              }
            },
            fill: {
              opacity: 1,
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                gradientToColors: ['#8B5CF6', '#F472B6'],
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 0.7,
                stops: [0, 100]
              }
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " users"
                }
              }
            },
            grid: {
              borderColor: '#f1f5f9',
              strokeDashArray: 5
            }
          }
        }
      };
      
      setChartData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};

  const handleExport = async (chartType, format) => {
    try {
      setExportLoading(true);
      setActiveDropdown(null);
      
      const chartConfig = chartData[chartType];
      const exportData = await metricService.exportChartData(chartConfig, chartType, format);
      
      const titles = {
        revenue: 'Revenue Trend',
        users: 'User Distribution', 
        activity: 'User Activity'
      };
      
      const filename = `${titles[chartType].replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}`;
      
      switch (format) {
        case 'csv':
          await exportService.exportToCSV(exportData.data, filename);
          break;
        case 'excel':
          await exportService.exportToExcel(exportData.data, filename);
          break;
        case 'pdf':
          await exportService.exportToPDF(exportData.data, filename, titles[chartType]);
          break;
      }
      
      toast.success(`Chart exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Export failed: ${error.message}`);
    } finally {
      setExportLoading(false);
    }
  };

  const ExportDropdown = ({ chartType, title }) => (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setActiveDropdown(activeDropdown === chartType ? null : chartType)}
        disabled={exportLoading}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ApperIcon name="Download" size={16} />
        <span className="hidden sm:inline">Export</span>
      </Button>
      
      {activeDropdown === chartType && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Export {title}
            </div>
            <button
              onClick={() => handleExport(chartType, 'csv')}
              disabled={exportLoading}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <ApperIcon name="FileText" size={14} />
              CSV Format
            </button>
            <button
              onClick={() => handleExport(chartType, 'excel')}
              disabled={exportLoading}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <ApperIcon name="FileSpreadsheet" size={14} />
              Excel Format
            </button>
            <button
              onClick={() => handleExport(chartType, 'pdf')}
              disabled={exportLoading}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <ApperIcon name="FileImage" size={14} />
              PDF Format
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.relative')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadChartData} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
<Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <ExportDropdown chartType="revenue" title="Revenue Trend" />
          </div>
          <Chart 
            options={chartData.revenue.options} 
            series={chartData.revenue.series} 
            type="line" 
            height={350} 
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
<Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Distribution</h3>
            <ExportDropdown chartType="users" title="User Distribution" />
          </div>
          <Chart 
            options={chartData.users.options} 
            series={chartData.users.series} 
            type="donut" 
            height={350} 
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-2"
      >
<Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Activity</h3>
            <ExportDropdown chartType="activity" title="User Activity" />
          </div>
          <Chart 
            options={chartData.activity.options} 
            series={chartData.activity.series} 
            type="bar" 
            height={350} 
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardCharts;