import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Add ArcElement for Pie charts
} from 'chart.js';
import { CircleLoader } from 'react-spinners'; // Updated import for CircleLoader
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie charts
);

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSTTSyOvOYmKiGeKXUUzxGWjQ7z9QpoUv1rFM1kkz5g7_vgKNmbiOcZPBQnyQMQCLJcFTS_rJ03KVHD/pub?gid=0&single=true&output=csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
        setLoading(false);
      },
    });

    return () => {
      // Cleanup function to destroy any existing charts
      const canvas = document.getElementsByTagName('canvas');
      if (canvas.length > 0) {
        const chart = ChartJS.getChart(canvas[0]);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, []);

  // Extract metrics
  const engagementData = data.map((entry) => entry['Engagement (%)']);
  const reachData = data.map((entry) => entry['Reach']);
  const impressionsData = data.map((entry) => entry['Impressions']);
  const followersData = data.map((entry) => entry['Followers Gained']);
  const dates = data.map((entry) => entry['Date']);

  // Chart data configuration for Engagement Rate vs Time
  const engagementChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: engagementData,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart data configuration for Followers Gained vs Time
  const followersChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Followers Gained',
        data: followersData,
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart data configuration for Reach vs Impressions comparison
  const reachImpressionsChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Reach',
        data: reachData,
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Impressions',
        data: impressionsData,
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart data configuration for Total Campaign Performance (Pie chart)
  const totalCampaignChartData = {
    labels: ['Reach', 'Impressions', 'Followers Gained'],
    datasets: [
      {
        data: [
          reachData.reduce((acc, curr) => acc + curr, 0),
          impressionsData.reduce((acc, curr) => acc + curr, 0),
          followersData.reduce((acc, curr) => acc + curr, 0),
        ],
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(75,192,192,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(75,192,192,1)'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircleLoader color="#00BFFF" size={80} />
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Social Media Performance Dashboard</h2>

      <div className="chart-container">
        <div className="chart-card">
          <h3>Engagement Rate Over Time</h3>
          <Line data={engagementChartData} />
        </div>

        <div className="chart-card">
          <h3>Followers Gained Over Time</h3>
          <Line data={followersChartData} />
        </div>

        <div className="chart-card">
          <h3>Reach vs Impressions</h3>
          <Line data={reachImpressionsChartData} />
        </div>

        <div className="chart-card">
          <h3>Total Campaign Performance</h3>
          <Pie data={totalCampaignChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
