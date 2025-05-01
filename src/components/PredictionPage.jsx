import React, { useState } from "react";
import axios from "axios";

function PredictionPage() {
  const [inputData, setInputData] = useState({
    age: "",
    workclass: "",
    education: "",
    occupation: "",
    hoursPerWeek: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/predict", inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error while fetching prediction:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enter your data for income prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={inputData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workclass" className="form-label">
            Workclass
          </label>
          <input
            type="text"
            className="form-control"
            id="workclass"
            name="workclass"
            value={inputData.workclass}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="education" className="form-label">
            Education
          </label>
          <input
            type="text"
            className="form-control"
            id="education"
            name="education"
            value={inputData.education}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="occupation" className="form-label">
            Occupation
          </label>
          <input
            type="text"
            className="form-control"
            id="occupation"
            name="occupation"
            value={inputData.occupation}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hoursPerWeek" className="form-label">
            Hours per week
          </label>
          <input
            type="number"
            className="form-control"
            id="hoursPerWeek"
            name="hoursPerWeek"
            value={inputData.hoursPerWeek}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Predict
        </button>
      </form>

      {prediction && (
        <div className="mt-3">
          <h4>Prediction: {prediction > 50000 ? "Above 50K" : "Below 50K"}</h4>
        </div>
      )}
    </div>
  );
}

export default PredictionPage;
