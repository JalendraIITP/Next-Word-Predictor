import React, { useEffect, useState } from 'react';
function App() {
  const [inputText, setInputText] = useState('');
  const [predictedWord, setPredictedWord] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const getNextWord = async () => {
    try {
      const text = inputText.split(" ").slice(-4, -1).join(" ")
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: text }),
      });
      const data = await response.json();
      setPredictedWord(data);
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    if (inputText.split(" ").slice(-4, -1).length > 2 && inputText[inputText.length - 1] === ' ') {
      getNextWord()
    }
  }, [inputText, getNextWord])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '10px',
      minWidth: '600px',
      minHeight: '400px'
    }}>
      <h1>Prediction of next word using NLP</h1>
      <textarea placeholder="Type your text here" onChange={handleInputChange} value={inputText} style={{
        width: '40%',
        height: '150px',
        borderRadius: '3px',
        padding: '10px',
        margin: '10px',
        outline: 'none',
        resize: 'none',
        overflow: 'auto',
        border: '1px solid black'
      }} />
      <h3>The next word may be : {predictedWord}</h3>
    </div >
  );
}
export default App;
