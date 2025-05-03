import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AnalyticsPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [edaData, setEdaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/eda');
      const data = await response.json();
      setEdaData(data);
    };
    fetchData();
  }, []);

  if (!edaData) return <div className="text-center">Loading...</div>;

  // توزيع الدخل
  const incomeDistributionData = {
    labels: Object.keys(edaData.income_distribution),
    datasets: [
      {
        label: 'Income Distribution',
        data: Object.values(edaData.income_distribution),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  // مصفوفة الارتباط
  const correlationData = {
    labels: Object.keys(edaData.correlation),
    datasets: Object.keys(edaData.correlation).map((col) => ({
      label: col,
      data: Object.values(edaData.correlation[col]),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.1,
    })),
  };

  // توزيع الدخل حسب الجنس
  const incomeBySexData = {
    labels: Object.keys(edaData.income_by_sex.Male || {}),
    datasets: [
      {
        label: 'Male',
        data: Object.values(edaData.income_by_sex.Male || {}),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Female',
        data: Object.values(edaData.income_by_sex.Female || {}),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // توزيع الدخل حسب التعليم
  const educationLabels = Object.keys(edaData.income_by_education);
  const educationLowIncome = educationLabels.map(
    (edu) => edaData.income_by_education[edu]['<=50K'] || 0
  );
  const educationHighIncome = educationLabels.map(
    (edu) => edaData.income_by_education[edu]['>50K'] || 0
  );

  const incomeByEducationData = {
    labels: educationLabels,
    datasets: [
      {
        label: '<=50K',
        data: educationLowIncome,
        backgroundColor: 'rgba(255, 205, 86, 0.7)',
      },
      {
        label: '>50K',
        data: educationHighIncome,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  return (
    <div className="container mt-5">
      {/* رسم توزيع الدخل */}
      <div className="card shadow-lg mb-4 border-primary rounded">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3>Income Distribution</h3>
        </div>
        <div className="card-body">
          <Line
            data={incomeDistributionData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Income Distribution Chart',
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Income',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Percentage (%)',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* جدول الإحصائيات العامة */}
      <div className="card shadow-lg mb-4 border-primary rounded">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3>Summary Statistics</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Column</th>
                <th>Count</th>
                <th>Mean</th>
                <th>Std</th>
                <th>Min</th>
                <th>25%</th>
                <th>50%</th>
                <th>75%</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(edaData.summary).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{edaData.summary[key].count}</td>
                  <td>{edaData.summary[key].mean}</td>
                  <td>{edaData.summary[key].std}</td>
                  <td>{edaData.summary[key].min}</td>
                  <td>{edaData.summary[key]['25%']}</td>
                  <td>{edaData.summary[key]['50%']}</td>
                  <td>{edaData.summary[key]['75%']}</td>
                  <td>{edaData.summary[key].max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مصفوفة الارتباط */}
      <div className="card shadow-lg mb-4 border-primary rounded">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3>Correlation Matrix</h3>
        </div>
        <div className="card-body">
          <Bar
            data={correlationData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Correlation Matrix',
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Columns',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Correlation Coefficient',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* توزيع الدخل حسب الجنس */}
      <div className="card shadow-lg mb-4 border-primary rounded">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3>Income by Gender</h3>
        </div>
        <div className="card-body">
          <Bar
            data={incomeBySexData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Income Distribution by Gender',
                },
              },
            }}
          />
        </div>
      </div>

      {/* توزيع الدخل حسب التعليم */}
      <div className="card shadow-lg mb-4 border-primary rounded">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3>Income by Education</h3>
        </div>
        <div className="card-body overflow-auto">
          <Bar
            data={incomeByEducationData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Income Distribution by Education',
                },
              },
              scales: {
                x: {
                  ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
