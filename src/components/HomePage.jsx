import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../custom.css'; // استدعاء الملف الخاص بالـ CSS

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center p-5 bg-dark-blue rounded shadow section-hover-effect">
        <h1 className="display-4 fw-bold text-white">Income Prediction App</h1>
        <p className="lead text-light">Predict if your income is above or below $50K using real census data and AI technology.</p>
        <button className="btn btn-custom-orange mt-3 px-4 py-2" onClick={() => navigate("/prediction")}>
          Try Prediction Now
        </button>
      </div>

      {/* Future Insights Section */}
      <div className="mt-5 p-4 bg-light rounded shadow-sm section-hover-effect">
        <h3>🔮 Predicting Your Future with AI</h3>
        <p>
          Imagine being able to glimpse into your financial future with just a few clicks. This app helps you estimate whether your income is likely to exceed $50K based on your personal attributes and work-related details. With the power of Artificial Intelligence, we turn your data into meaningful insights, guiding you to make smarter career and education decisions.
        </p>
        <ul>
          <li>Plan your career path with income insights</li>
          <li>Understand which factors impact earning potential</li>
          <li>Make informed decisions about work, education, and more</li>
        </ul>
      </div>

      {/* About the Model */}
      <div className="mt-5 p-4 bg-secondary border rounded shadow-sm section-hover-effect">
        <h3>🤖 About the Model</h3>
        <p>
          Our prediction engine is powered by a Support Vector Machine (SVM), a popular and powerful machine learning model. It analyzes real census data to find patterns that relate your background to income brackets. By learning from thousands of examples, the model can predict your income level based on factors like age, education, occupation, and hours worked per week.
        </p>
        <p className="mb-0">
          <strong>Artificial Intelligence</strong> isn't just a buzzword — it's a practical tool that empowers you to understand trends, forecast outcomes, and take control of your future.
        </p>
      </div>

      {/* Dataset Highlights */}
      <div className="mt-5">
        <h2 className="text-center mb-4">📊 Dataset Highlights</h2>
        <div className="row g-4">
          {[ 
            { title: "Age", desc: "The individual's age" },
            { title: "Workclass", desc: "Type of employment (e.g., Private, Gov)" },
            { title: "Education", desc: "Qualification (e.g., Bachelors)" },
            { title: "Occupation", desc: "Profession (e.g., Tech-support, Sales)" },
            { title: "Hours/Week", desc: "Average weekly working hours" },
            { title: "Income", desc: "Target: <=50K or >50K" },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Workflow */}
      <div className="mt-5">
        <h2 className="text-center mb-4">⚙️ Project Workflow</h2>
        <div className="row text-center">
          {[ 
            { icon: "🔍", step: "Exploratory Data Analysis" },
            { icon: "🧹", step: "Data Cleaning & Preprocessing" },
            { icon: "⚙️", step: "Feature Engineering" },
            { icon: "🧠", step: "SVM Model Training" },
            { icon: "🧪", step: "Evaluation" },
            { icon: "🌐", step: "Deployment" },
          ].map((item, i) => (
            <div className="col-md-2 mb-3" key={i}>
              <div className="card p-3 shadow-sm h-100">
                <div className="display-4">{item.icon}</div>
                <p className="mt-2 text-light">{item.step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Page Section */}
      <div className="mt-5 p-4 bg-light rounded shadow-sm">
        <h3>📈 Data Analysis Insights</h3>
        <p>
          In addition to prediction, our project includes a full-featured <strong>Analysis Page</strong> that explores key insights from the dataset. This section uses interactive visualizations to help you understand patterns in income distribution.
        </p>
        <ul>
          <li>View income trends by education level, age, and gender</li>
          <li>Understand the most influential features affecting income</li>
          <li>Visualize distributions, correlations, and outliers</li>
          <li>Make data-driven career or educational decisions</li>
        </ul>
        <p>
          You can access this section by navigating to the <strong>“Analysis”</strong> tab on the site.
        </p> 
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/analytics")}>
          View Data Analysis
        </button>
      </div>

      {/* Project Goal */}
      <div className="mt-5 p-4 bg-secondary border rounded shadow-sm">
        <h3>🎯 Project Goal</h3>
        <p>
          To build a predictive model using Support Vector Machines (SVM) that can classify individuals based on demographic and work-related features to determine if their income is above $50K.
        </p>
        <ul>
          <li>Understand real-world census data</li>
          <li>Handle missing and categorical values</li>
          <li>Train and evaluate a robust model</li>
          <li>Deploy it with a user-friendly interface</li>
        </ul>
      </div>

      {/* Final Call to Action */}
      <div className="text-center mt-5 mb-5">
        <h4>Ready to see your income prediction?</h4>
        <button className="btn btn-success mt-2 px-4 py-2" onClick={() => navigate("/prediction")}>
          Go to Prediction Page
        </button>
      </div>
    </div>
  );
}

export default HomePage;
