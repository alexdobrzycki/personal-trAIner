import React, { useState } from 'react';
import './App.css';

function App() {
  const [workoutFocus, setWorkoutFocus] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additional, setAdditional] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);


  const handleFocusChange = (e) => {
    setWorkoutFocus(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <div>
              <label>Focus on:</label>
              <div>
                <input
                  type="radio"
                  value="Intensity"
                  onChange={handleFocusChange}
                  checked={workoutFocus === 'Intensity'}
                />
                <label>Intensity</label>
                <input
                  type="radio"
                  value="Volume"
                  onChange={handleFocusChange}
                  checked={workoutFocus === 'Volume'}
                />
                <label>Volume</label>
              </div>
            </div>
            <div>
              <label>Choose muscle groups:</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="chest"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('chest')}
                  />
                  Chest
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="triceps"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('triceps')}
                  />
                  Triceps
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="back"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('back')}
                  />
                  Back
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="biceps"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('biceps')}
                  />
                  Biceps
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="legs"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes('legs')}
                  />
                  Legs
                </label>
              </div>
            </div>
            <div>
              <label>Additional Requests:</label>
              <textarea value={additional} onChange={(e) => setAdditional(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>{response}</div>
      )}
    </div>
  );
}

export default App;
