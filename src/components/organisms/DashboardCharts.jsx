import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const DashboardCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
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