import React, { useState } from 'react';
import './HeartDisease.css'; // Import the CSS file

function HeartDisease({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    sex: '0',
    chest_pain_type: '1',
    resting_blood_pressure: '',
    serum_cholesterol: '',
    fasting_blood_sugar: '0',
    resting_ecg: '0',
    max_heart_rate: '',
    exercise_angina: '0',
    oldpeak: '',
    slope: '1',
    num_vessels: '',
    thal: '1'
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await onSubmit(formData);
    console.log(response);
    setResult(response.data.result);
  };


  return (
    <div className="heart-disease">
    <h2>Heart Disease Prediction</h2>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-column">
        <label htmlFor="age">Age:</label>
        <input type="text" name="age" id="age" value={formData.age} onChange={handleChange} className='input-field' required /><br /><br />

        <label htmlFor="sex">Sex:</label>
        <select name="sex" id="sex" value={formData.sex} onChange={handleChange} className='input-field'>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select><br /><br />

        <label htmlFor="chest_pain_type">Chest Pain Type:</label>
        <select name="chest_pain_type" id="chest_pain_type" value={formData.chest_pain_type} onChange={handleChange} className='input-field'>
          <option value="1">Typical Angina</option>
          <option value="2">Atypical Angina</option>
          <option value="3">Non-anginal Pain</option>
        </select><br /><br />

         
        <label htmlFor="resting_blood_pressure">Resting Blood Pressure:</label>
        <input type="text" name="resting_blood_pressure" id="resting_blood_pressure" value={formData.resting_blood_pressure} onChange={handleChange} className='input-field' required /><br /><br />



        <label htmlFor="serum_cholesterol">Serum Cholesterol:</label>
        <input type="text" name="serum_cholesterol" id="serum_cholesterol" value={formData.serum_cholesterol} onChange={handleChange} className='input-field' required /><br /><br />

        </div>
        <div className="form-column">


        <label htmlFor="fasting_blood_sugar">Fasting Blood Sugar:</label>
        <select name="fasting_blood_sugar" id="fasting_blood_sugar" value={formData.fasting_blood_sugar} onChange={handleChange} className='input-field'>
          <option value="0">Lower than 120mg/ml</option>
          <option value="1">Greater than 120mg/ml</option>

        </select><br /><br />

        <label htmlFor="resting_ecg">Resting ECG:</label>
        <select name="resting_ecg" id="resting_ecg" value={formData.resting_ecg} onChange={handleChange} className='input-field'>
          <option value="0">Normal</option>
          <option value="1">ST-T wave abnormality</option>
          <option value="2">Left ventricular hypertrophy</option>
        </select><br /><br />



        <label htmlFor="max_heart_rate">Max Heart Rate:</label>
        <input type="text" name="max_heart_rate" id="max_heart_rate" value={formData.max_heart_rate} onChange={handleChange} className='input-field' required/><br /><br />


        
        <label htmlFor="exercise_angina">Exercise Angina:</label>
        <select name="exercise_angina" id="exercise_angina" value={formData.exercise_angina} onChange={handleChange} className='input-field'>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select><br /><br />



        <label htmlFor="oldpeak">Oldpeak:</label>
        <input type="text" name="oldpeak" id="oldpeak" value={formData.oldpeak} onChange={handleChange} className='input-field' required /><br /><br />

        </div>
        <div className="form-column">

        
        <label htmlFor="slope">Slope:</label>
        <select name="slope" id="slope" value={formData.slope} onChange={handleChange} className='input-field'>
          <option value="1">Upsloping</option>
          <option value="2">Flat</option>
          <option value="3">Downsloping</option>

        </select><br /><br />

        <label htmlFor="num_vessels">Number of Major Vessels:</label>
        <select name="num_vessels" id="num_vessels" value={formData.num_vessels} onChange={handleChange} className='input-field'>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select><br /><br />

        <label htmlFor="thal">Thal:</label>
        <select name="thal" id="thal" value={formData.thal} onChange={handleChange} className='input-field'>
          <option value="1">Normal</option>
          <option value="2">Fixed Defect</option>
          <option value="3">Reversible Defect</option>
        </select><br /><br />    

        <input type="submit" value="Predict" className="submit-button" />
        {result && (
        <div>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
        </div>
      </form>
      
    </div>
    </div>
  );
}

export default HeartDisease;


