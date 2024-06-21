// import React, { useState, useEffect } from 'react';
// import './../styles/App.css';

// function App() {
//   const [seconds, setSeconds] = useState(0);
//   const [min, setMin] = useState(0);
//   const [centi, setCenti] = useState(0);
//   const [laps, setLaps] = useState([]);
//   const [intervalId, setIntervalId] = useState('');

//   if (centi > 99) {
//     setCenti(centi => centi-100)
//     setSeconds(seconds => seconds+1)
//   }
//   if (seconds > 59) {
//     setSeconds(seconds => seconds-60)
//     setMin(min => min+1)
//   }

//   const handleClick = (val) => {
//     switch (val) {
//       case 0:
//         const interval = setInterval(() => setCenti(centi => centi + 1), 100);
//         setIntervalId(interval)
//         break;
//       case 1:
//         clearInterval(intervalId)
//         break;
//       case 2:
//         setLaps(laps => [...laps, `${min<10 ? `0${min}` : min}:${seconds<10 ? `0${seconds}` : seconds}:${centi<10 ? `0${centi}` : centi}`])
//         break;
//       case 3:
//         clearInterval(intervalId)
//         setCenti(0)
//         setSeconds(0)
//         setMin(0)
//         setLaps([])
//         setIntervalId('')
//         break;
    
//       default:
//         break;
//     }
//   }

//   useEffect(() => {
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="timer">
//       <p>{min<10 ? `0${min}` : min}:{seconds<10 ? `0${seconds}` : seconds}:{centi<10 ? `0${centi}` : centi}</p>
//         <button onClick={() => handleClick(0)}>Start</button>
//         <button onClick={() => handleClick(1)}>Stop</button>
//         <button onClick={() => handleClick(2)}>Lap</button>
//         <button onClick={() => handleClick(3)}>Reset</button>
//         <ul>
//           {laps.map(lap => (<li>{lap}</li>))}
//         </ul>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState,useRef } from 'react'

const App = () => {
   const [trackingTime,setTrackingTime]=useState(0);
   const [lapItem,SetLapItem]=useState([]);
   let intervalTime=useRef();
   
   useEffect(()=>{
    return ()=> clearInterval(intervalTime.current);
   },[])
   function handleStart(){
    clearInterval(intervalTime.current);
    intervalTime.current = setInterval(() => {
        setTrackingTime((prevTime) => prevTime + 1);
    }, 10);
}
  function handleStop(){
    if(intervalTime.current){
    clearInterval(intervalTime.current);
    intervalTime.current=null;}
  }
  function handleLap() {
    SetLapItem((prevItem) => [...prevItem, trackingTime])
  }
  function handleReset(){
    clearInterval(intervalTime.current);
    intervalTime.current=null
    setTrackingTime(0);
    SetLapItem([]);


  }
  function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

  return (
    <div>
         {`${pad(Math.floor(trackingTime / 360000))}:${pad(Math.floor((trackingTime / 6000) % 60))}:${pad(Math.floor((trackingTime / 100) % 60))}:${pad(trackingTime % 100)}`}
         <div>
         The lap items are :{lapItem.map((item,index)=>{
        return<ul> <li> <p>{`${pad(Math.floor(item / 360000))}:${pad(Math.floor((item / 6000) % 60))}:${pad(Math.floor((item / 100) % 60))}:${pad(item % 100)}`}</p></li> </ul>
         })}    </div>
        
         <div id="root" >
        <button onClick={handleStart} >Start</button>
        <button onClick={handleStop} >Stop</button>
        <button onClick={handleLap} >Lap</button>
        <button onClick={handleReset} >Reset</button></div>

    </div>
  )
}

export default App