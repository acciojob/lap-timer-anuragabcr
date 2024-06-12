import React, { useState, useEffect } from 'react';
import './../styles/App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);
  const [centi, setCenti] = useState(0);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState('');

  if (centi > 99) {
    setCenti(centi => centi-100)
    setSeconds(seconds => seconds+1)
  }
  if (seconds > 59) {
    setSeconds(seconds => seconds-60)
    setMin(min => min+1)
  }

  const handleClick = (val) => {
    switch (val) {
      case 0:
        const interval = setInterval(() => setCenti(centi => centi + 1), 100);
        setIntervalId(interval)
        break;
      case 1:
        clearInterval(intervalId)
        break;
      case 2:
        setLaps(laps => [...laps, `${min<10 ? `0${min}` : min}:${seconds<10 ? `0${seconds}` : seconds}:${centi<10 ? `0${centi}` : centi}`])
        break;
      case 3:
        clearInterval(intervalId)
        setCenti(0)
        setSeconds(0)
        setMin(0)
        setLaps([])
        setIntervalId('')
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timer">
      <p>{min<10 ? `0${min}` : min}:{seconds<10 ? `0${seconds}` : seconds}:{centi<10 ? `0${centi}` : centi}</p>
      <div>
        <button onClick={() => handleClick(0)}>Start</button>
        <button onClick={() => handleClick(1)}>Stop</button>
        <button onClick={() => handleClick(2)}>Lap</button>
        <button onClick={() => handleClick(3)}>Reset</button>
        <ul>
          {laps.map(lap => (<li>{lap}</li>))}
        </ul>
      </div>
    </div>
  );
}

export default App;
