import React, { useState } from 'react'

const App = () => {
  const [time,setTime] = useState(0);
  const [start,setStart] = useState(false);
  const [pause,setPause] = useState(false);

  const handleTime = () =>{
      setStart(true)
    

      if(start){
      const id  = setInterval(() => {
       setTime(prevTime => prevTime + 1);
      }, 1000);
      }else {
        clearInterval(id)
      }
     

  }


  // const handleReset = () =>{
  //   setStart(false)
  //   setTime(0)
  //   clearInterval(handleTime)
  //   clearInterval(handlePause)
  // }

  return (
    <>
       <h1>STOPWATCH</h1>
      {start && <p>{time}</p>}
       <button onClick={handleTime}>Start</button>
       <button onClick={handlePause}>Pause</button>
       <button onClick={()=>{}}>Reset</button>
    </>
  )
}

export default App
