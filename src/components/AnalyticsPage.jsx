import React, { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/api/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error while fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="container">
      <h2>Analytics and Insights</h2>
      {analyticsData ? (
        <div>
          <h4>Prediction Accuracy: {analyticsData.accuracy}</h4>
          <h4>F1-Score: {analyticsData.f1Score}</h4>
          <h4>Recall: {analyticsData.recall}</h4>
          <h4>Precision: {analyticsData.precision}</h4>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
}

export default AnalyticsPage;
