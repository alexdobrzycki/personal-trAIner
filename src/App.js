import React, { useState } from 'react';
import './App.css';

function App() {
  const [workoutFocus, setWorkoutFocus] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additional, setAdditional] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [areFieldsFilled, setAreFieldsFilled] = useState(false);


  const handleFocusChange = (e) => {
    setWorkoutFocus(e.target.value);
    setAreFieldsFilled(selectedOptions.length > 0 && e.target.value !== '');
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
      setAreFieldsFilled(selectedOptions.length !== 1);
    } else {
      setSelectedOptions([...selectedOptions, value]);
      setAreFieldsFilled(workoutFocus !== '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!workoutFocus) {
      alert("Please select a workout focus (Intensity or Volume).");
      return;
    }

    if (selectedOptions.length === 0) {
      alert("Please select at least one muscle group.");
      return;
    }

    setShowResponse(true);
    fetch(process.env.REACT_APP_FETCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workoutFocus: workoutFocus,
        selectedOptions: selectedOptions,
        additional: additional,
      }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1 className="title">
        Your very own personal tr<span className="AI-title">AI</span>ner.
      </h1>
      {!showResponse ? (
        <div>
          <h3 className="secondary-title">
            Looking for a quick and effective workout plan? Specify your preferences, and use the power of OpenAI's API
            to generate a personalized workout just for you!
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-top">
              <label className="main-label">Focus on:</label>
              <div className="input-container">
                <label className={`radio-option ${workoutFocus === 'Intensity' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="Intensity"
                    onChange={handleFocusChange}
                    checked={workoutFocus === 'Intensity'}
                  />
                  Intensity
                </label>
                <label className={`radio-option ${workoutFocus === 'Volume' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="Volume"
                    onChange={handleFocusChange}
                    checked={workoutFocus === 'Volume'}
                  />
                  Volume
                </label>
              </div>
            </div>
            <div>
              <label className="main-label">Choose muscle groups:</label>
              <div className="input-container">
                <label className={`checkbox-option ${selectedOptions.includes('Chest') ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value="Chest"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('Chest')}
                  />
                  Chest
                </label>
                <label className={`checkbox-option ${selectedOptions.includes('Triceps') ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value="Triceps"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('Triceps')}
                  />
                  Triceps
                </label>
                <label className={`checkbox-option ${selectedOptions.includes('Back') ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value="Back"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('Back')}
                  />
                  Back
                </label>
                <label className={`checkbox-option ${selectedOptions.includes('Biceps') ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value="Biceps"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('Biceps')}
                  />
                  Biceps
                </label>
                <label className={`checkbox-option ${selectedOptions.includes('Legs') ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value="Legs"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('Legs')}
                  />
                  Legs
                </label>
              </div>
            </div>
            <div className="additional-requests">
              <label className="main-label">Additional Requests:</label>
              <textarea
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
                className="rounded-textarea"
              />
            </div>
            <button className={areFieldsFilled ? 'green-button' : 'normal-button'} type="submit">
              Generate Workout
            </button>
          </form>
        </div>
      ) : (
        <div>{response}</div>
      )}
      <p className="bottomleft">Created by: <a href="https://www.alexdob.com/" target="_blank" rel="noopener noreferrer">alexdob</a></p>
      <p className="bottomright"><a href="https://alexdob.com/#gallery-3" target="_blank" rel="noopener noreferrer">HOW THIS WORKS</a></p>
    </div>
  );
}

export default App;
