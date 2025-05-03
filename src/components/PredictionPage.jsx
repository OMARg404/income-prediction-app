import axios from "axios";
import './PredictionPage.css';
import Chart from "chart.js/auto";
import React, { useState, useEffect, useRef } from "react";

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
      console.log(response.data)
      setPrediction(response.data);
    } catch (error) {
      setError("An error occurred while fetching prediction, please try again.");
    } finally {
      setLoading(false);
    }
  };
  const PredictionChart = ({ prediction }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (!prediction || typeof prediction !== "object" || !chartRef.current) return;
  
      // استخراج labels و data بنسبة مئوية
      const labels = Object.keys(prediction);
      const data = Object.values(prediction).map((value) =>
        parseFloat((value * 1).toFixed(2))
      );
  
      // تدمير الرسم البياني السابق إذا وجد
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const ctx = chartRef.current.getContext("2d");
  
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Prediction Results (%)",
              data: data,
              backgroundColor: [
                "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
                "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.parsed.toFixed(2)}%`;
                }
              }
            }
          },
        },
      });
  
      // تنظيف عند إزالة الكومبوننت
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [prediction]);
    
  return <canvas ref={chartRef} id="predictionChart" />;
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Income Prediction Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="number" name="age" value={inputData.age} onChange={handleInputChange} className="form-control" placeholder="Age" />
          </div>
          <div className="col-md-6">
            <input type="text" list="wlist" name="workclass" value={inputData.workclass} onChange={handleInputChange} className="form-control" placeholder="Workclass" />
            <datalist id="wlist">
              <option value="Private" />
              <option value="Self-emp-not-inc" />
              <option value="Self-emp-inc" />
              <option value="Federal-gov" />
              <option value="Local-gov" />
              <option value="State-gov" />
              <option value="Without-pay" />
              <option value="Never-worked" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="number" name="fnlwgt" value={inputData.fnlwgt} onChange={handleInputChange} className="form-control" placeholder="Final Weight" />
          </div>
          <div className="col-md-6">
            <input type="text" list="elist" name="education" value={inputData.education} onChange={handleInputChange} className="form-control" placeholder="Education" />
            <datalist id="elist">
              <option value="HS-grad" />
              <option value="Some-college" />
              <option value="7th-8th" />
              <option value="10th" />
              <option value="Doctorate" />
              <option value="Prof-school" />
              <option value="Bachelors" />
              <option value="Masters" />
              <option value="11th" />
              <option value="Assoc-acdm" />
              <option value="Assoc-voc" />
              <option value="1st-4th" />
              <option value="5th-6th" />
              <option value="12th" />
              <option value="9th" />
              <option value="Preschool" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="number" name="education_num" value={inputData.education_num} onChange={handleInputChange} className="form-control" placeholder="Education Number" />
          </div>
          <div className="col-md-6">
            <input type="text" list="mlist" name="marital_status" value={inputData.marital_status} onChange={handleInputChange} className="form-control" placeholder="Marital Status" />
            <datalist id="mlist">
              <option value="Widowed" />
              <option value="Divorced" />
              <option value="Separated" />
              <option value="Married-civ-spouse" />
              <option value="Never-married" />
              <option value="Married-spouse-absent" />
              <option value="Married-AF-spouse" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="text" list="olist" name="occupation" value={inputData.occupation} onChange={handleInputChange} className="form-control" placeholder="Occupation" />
            <datalist id="olist">
              <option value="Exec-managerial" />
              <option value="Machine-op-inspct" />
              <option value="Prof-specialty" />
              <option value="Other-service" />
              <option value="Adm-clerical" />
              <option value="Craft-repair" />
              <option value="Transport-moving" />
              <option value="Handlers-cleaners" />
              <option value="Sales" />
              <option value="Farming-fishing" />
              <option value="Tech-support" />
              <option value="Protective-serv" />
              <option value="Armed-Forces" />
              <option value="Priv-house-serv" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="text" list="rlist" name="relationship" value={inputData.relationship} onChange={handleInputChange} className="form-control" placeholder="Relationship" />
            <datalist id="rlist">
              <option value="Not-in-family" />
              <option value="Unmarried" />
              <option value="Own-child" />
              <option value="Other-relative" />
              <option value="Husband" />
              <option value="Wife" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="text" list="racelist" name="race" value={inputData.race} onChange={handleInputChange} className="form-control" placeholder="Race" />
            <datalist id="racelist">
              <option value="White" />
              <option value="Black" />
              <option value="Asian-Pac-Islander" />
              <option value="Amer-Indian-Eskimo" />
              <option value="Other" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="text" list="slist" name="sex" value={inputData.sex} onChange={handleInputChange} className="form-control" placeholder="Sex" />
            <datalist id="slist">
              <option value="Male" />
              <option value="Female" />
            </datalist>
          </div>

          <div className="col-md-6">
            <input type="number" name="capital_gain" value={inputData.capital_gain} onChange={handleInputChange} className="form-control" placeholder="Capital Gain" />
          </div>
          <div className="col-md-6">
            <input type="number" name="capital_loss" value={inputData.capital_loss} onChange={handleInputChange} className="form-control" placeholder="Capital Loss" />
          </div>

          <div className="col-md-6">
            <input type="number" name="hours_per_week" value={inputData.hours_per_week} onChange={handleInputChange} className="form-control" placeholder="Hours per Week" />
          </div>
          <div className="col-md-6">
  <input
    type="text"
    name="native_country"
    value={inputData.native_country}
    onChange={handleInputChange}
    list="clist"
    className="form-control"
    placeholder="Native Country"
  />
  <datalist id="clist">
    <option value="United-States" />
    <option value="Cambodia" />
    <option value="England" />
    <option value="Puerto-Rico" />
    <option value="Canada" />
    <option value="Germany" />
    <option value="Outlying-US(Guam-USVI-etc)" />
    <option value="India" />
    <option value="Japan" />
    <option value="Greece" />
    <option value="South" />
    <option value="China" />
    <option value="Cuba" />
    <option value="Iran" />
    <option value="Honduras" />
    <option value="Philippines" />
    <option value="Italy" />
    <option value="Poland" />
    <option value="Jamaica" />
    <option value="Vietnam" />
    <option value="Mexico" />
    <option value="Portugal" />
    <option value="Ireland" />
    <option value="France" />
    <option value="Dominican-Republic" />
    <option value="Laos" />
    <option value="Ecuador" />
    <option value="Taiwan" />
    <option value="Haiti" />
    <option value="Colombia" />
    <option value="Hungary" />
    <option value="Guatemala" />
    <option value="Nicaragua" />
    <option value="Scotland" />
    <option value="Thailand" />
    <option value="Yugoslavia" />
  </datalist>
</div>

        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Predict</button>
        </div>
      </form>

      {loading && <p className="mt-3 text-center text-warning">Loading...</p>}
      {error && <p className="mt-3 text-center text-danger">{error}</p>}
      {prediction && (
        <div className="mt-5 text-center">
          <h4>Prediction Results:</h4>
          <PredictionChart prediction={prediction} />
        </div>
      )}
    </div>
  );
}

export default PredictionPage;
