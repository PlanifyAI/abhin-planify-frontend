import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  // const [form, setForm] = useState({ direction: '', size_sqft: '', rooms: '', city: '' });
  const [form, setForm] = useState({ direction: '', size_sqft: '', rooms: '', city: '' });
  const [plan, setPlan] = useState('');
  const [estimate, setEstimate] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitPlan = async () => {
    const res = await axios.post('http://localhost:8000/generate_plan', form);
    setPlan(res.data.plan_svg);
  };

  const submitEstimate = async () => {
    const res = await axios.post('http://localhost:8000/api/estimate', form);
    setEstimate(res.data);
  };

  return (
    <div style={{ margin: 40 }}>
      <h1>🏠 Home Plan & Estimator</h1>
      <div>
        <input name="direction" placeholder="Direction (e.g. East)" onChange={handleChange} />
        <input name="size_sqft" placeholder="Size (sqft)" onChange={handleChange} />
        <input name="rooms" placeholder="Rooms" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <button onClick={submitPlan}>Generate Plan</button>
        <button onClick={submitEstimate}>Get Estimate</button>
      </div>

      {plan && <div dangerouslySetInnerHTML={{ __html: plan }} />}
      {estimate && (
        <div>
          <h3>Cost Estimate</h3>
          <p>Material: ₹{estimate.material_cost}</p>
          <p>Labor: ₹{estimate.labor_cost}</p>
          <p>Total: ₹{estimate.total_cost}</p>
          <p>Duration: {estimate.duration_days} days</p>
        </div>
      )}
    </div>
  );
}