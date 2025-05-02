import React, { useState } from "react";
import axios from "axios";
import './PredictionPage.css'; // Custom CSS for styling

function PredictionPage() {
  const [inputData, setInputData] = useState({
    age: "",
    workclass: "",
    fnlwgt: "",
    education: "",
    education_num: "",
    marital_status: "",
    occupation: "",
    relationship: "",
    race: "",
    sex: "",
    capital_gain: "",
    capital_loss: "",
    hours_per_week: "",
    native_country: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const mappedData = {
      age: Number(inputData.age),
      workclass: inputData.workclass,
      fnlwgt: Number(inputData.fnlwgt),
      education: inputData.education,
      "education.num": Number(inputData.education_num),
      "marital.status": inputData.marital_status,
      occupation: inputData.occupation,
      relationship: inputData.relationship,
      race: inputData.race,
      sex: inputData.sex,
      "capital.gain": Number(inputData.capital_gain),
      "capital.loss": Number(inputData.capital_loss),
      "hours.per.week": Number(inputData.hours_per_week),
      "native.country": inputData.native_country
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", mappedData);
      console.log("Prediction API Response:", response.data);
      setPrediction(response.data);
    } catch (error) {
      setError("An error occurred while fetching prediction, please try again.");
      console.error("Error while fetching prediction:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Income Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {[
            { label: "Age", name: "age", type: "number", description: "Enter your age." },
            { label: "Workclass", name: "workclass", type: "text", description: "Enter your type of work." },
            { label: "FNLWGT", name: "fnlwgt", type: "number", description: "Enter your final weight." },
            { label: "Education", name: "education", type: "text", description: "Enter your education level." },
            { label: "Education Num", name: "education_num", type: "number", description: "Enter the number of years of education." },
            { label: "Marital Status", name: "marital_status", type: "text", description: "Enter your marital status." },
            { label: "Occupation", name: "occupation", type: "text", description: "Enter your occupation." },
            { label: "Relationship", name: "relationship", type: "text", description: "Enter your relationship status." },
            { label: "Race", name: "race", type: "text", description: "Enter your race." },
            { label: "Sex", name: "sex", type: "text", description: "Enter your sex (e.g., Male/Female)." },
            { label: "Capital Gain", name: "capital_gain", type: "number", description: "Enter your capital gain." },
            { label: "Capital Loss", name: "capital_loss", type: "number", description: "Enter your capital loss." },
            { label: "Hours per Week", name: "hours_per_week", type: "number", description: "Enter the number of hours you work per week." },
            { label: "Native Country", name: "native_country", type: "text", description: "Enter your native country." }
          ].map(({ label, name, type, description }) => (
            <div className="col-md-6 mb-3" key={name}>
              <label htmlFor={name} className="form-label">{label}</label>
              <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={inputData[name]}
                onChange={handleInputChange}
                required
              />
              <small className="form-text text-muted">{description}</small>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary px-5" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger mt-4 text-center">
          {error}
        </div>
      )}

      {prediction && !loading && (
        <div className="mt-5 text-center">
          <h4 className="mb-4">Prediction Result:</h4>
          <div className="d-flex justify-content-center gap-4">
            {/* Combined Circular Chart for Income Prediction */}
            <div className="circular-chart">
  <svg viewBox="0 0 36 36" width="150" height="150">
    <path
      className="circle-bg"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      className={prediction["<=50K"] > prediction[">50K"] ? "circle income-low" : "circle income-high"}
      strokeDasharray={`${Math.max(prediction["<=50K"], prediction[">50K"])}, ${100 - Math.max(prediction["<=50K"], prediction[">50K"])}`}
/>
    <text x="18" y="18" className="percentage">
      <tspan x="18" dy="-0.3em">{prediction["<=50K"] > prediction[">50K"] ? "≤ 50K" : "> 50K"}</tspan>
      <tspan x="18" dy="1.2em">
        {Math.max(prediction["<=50K"], prediction[">50K"]).toFixed(1)}%
      </tspan>
    </text>
  </svg>
</div>

          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionPage;
