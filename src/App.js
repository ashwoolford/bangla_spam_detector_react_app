import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');  // Input text state
  const [prediction, setPrediction] = useState('');  // To store prediction result
  const [error, setError] = useState('');  // To handle any errors
  const [loading, setLoading] = useState(false);  // To handle loading state

  // Function to handle the API call
  const handleCheckSpam = async () => {
    setError('');  // Clear any previous errors
    setPrediction('');  // Clear previous prediction
    setLoading(true);  // Show loading bar

    try {
      const response = await fetch('https://wily-rhea-greter-8ada5b00.koyeb.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_string: inputText }),  // Payload to send
      });

      const result = await response.json();

      if (response.ok) {
        // If the request is successful, store the prediction result
        setPrediction(result.prediction);
      } else {
        // Handle errors returned from the server
        setError(result.error || 'Something went wrong!');
      }
    } catch (err) {
      // Handle any network errors or issues with the request
      setError('Failed to connect to the API.');
    } finally {
      setLoading(false);  // Hide loading bar
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bangla Language Spam Detector</h1>
        <p>Detect spam messages written in the Bangla language with ease. Enter the text below and check for spam.</p>
      </header>

      <div className="input-container">
        <textarea
          placeholder="Enter Bangla text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="textarea-box"
        />
        <button className="check-button" onClick={handleCheckSpam} disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>

      {/* Show loading bar if loading */}
      {loading && <div className="loading-bar"></div>}

      {/* Displaying the result or error */}
      {prediction && !loading && (
        <div className="result-container">
          <h3>The email is {prediction === 'Spam' ? "a spam" : "not a spam"}</h3>
        </div>
      )}

      {error && !loading && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;

