import React, { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsPage() {
  const [edaData, setEdaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEDA = async () => {
      try {
        const response = await axios.get("/eda");
        setEdaData(response.data);
      } catch (error) {
        console.error("Error fetching EDA data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEDA();
  }, []);

  if (loading) {
    return <div className="container mt-5">Loading EDA...</div>;
  }

  if (!edaData) {
    return <div className="container mt-5">Failed to load EDA data.</div>;
  }

  const {
    summary,
    income_distribution,
    income_by_sex,
    income_by_education,
    correlation,
    plots,
  } = edaData;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🔍 Analytics and Insights</h2>

      {/* Summary Section */}
      <div className="mb-4">
        <h4>📋 Summary Statistics:</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Feature</th>
                {Object.keys(summary[Object.keys(summary)[0]]).map((stat) => (
                  <th key={stat}>{stat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([feature, stats]) => (
                <tr key={feature}>
                  <th>{feature}</th>
                  {Object.values(stats).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Income Distribution */}
      <div className="mb-4">
        <h4>📊 Income Distribution:</h4>
        <ul>
          {Object.entries(income_distribution).map(([k, v]) => (
            <li key={k}>
              {k}: {v}%
            </li>
          ))}
        </ul>
      </div>

      {/* Income by Sex */}
      <div className="mb-4">
        <h4>👫 Income by Sex:</h4>
        {Object.entries(income_by_sex).map(([sex, data]) => (
          <div key={sex}>
            <strong>{sex}</strong>
            <ul>
              {Object.entries(data).map(([income, value]) => (
                <li key={income}>
                  {income}: {value}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Income by Education */}
      <div className="mb-4">
        <h4>🎓 Income by Education:</h4>
        {Object.entries(income_by_education).map(([edu, data]) => (
          <div key={edu}>
            <strong>{edu}</strong>
            <ul>
              {Object.entries(data).map(([income, value]) => (
                <li key={income}>
                  {income}: {value}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Correlation Matrix */}
      <div className="mb-4">
        <h4>📈 Correlation Matrix:</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th></th>
                {Object.keys(correlation).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(correlation).map(([row, cols]) => (
                <tr key={row}>
                  <th>{row}</th>
                  {Object.values(cols).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visualizations */}
      <div className="mb-4">
        <h4>🖼️ Visualizations:</h4>
        {Object.entries(plots).map(([title, base64]) => (
          <div key={title} className="mb-4">
            <h5 className="text-capitalize">{title.replace(/_/g, " ")}</h5>
            <img
              src={`data:image/png;base64,${base64}`}
              alt={title}
              className="img-fluid border shadow-sm"
              style={{ maxWidth: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsPage;
