import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const WorldMapChart = ({ allStateData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (allStateData && allStateData.Cases > 0) {
      const data = {
        datasets: [
          {
            data: [
              parseInt(allStateData.Cases),
              parseInt(allStateData.Death),
              parseInt(allStateData.Recovered),
            ],
            backgroundColor: ['green', 'red', 'blue'],
            hoverBackgroundColor: ['green', 'red', 'blue'],
          },
        ],
        labels: ['Cases', 'Death', 'Recovered'],
      };

      setChartData(data);
    }
  }, [allStateData]);

  const textCenterPlugin = {
    beforeDatasetsDraw(chart) {
      if (chartData && chartData.datasets[0].data[0] > 0) {
        const ctx = chart.ctx;
        const totalCases = chartData.datasets[0].data[0];
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(totalCases, centerX, centerY);
        ctx.restore();
      }
    },
  };

  // Conditional rendering to avoid rendering when chartData is null
  return chartData ? (
    <>
    <Doughnut data={chartData} plugins={[textCenterPlugin]} style={{ backgroundColor: 'white' }} />
    </>
  ) : null;
};

export default WorldMapChart;
