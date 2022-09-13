import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from './Context'
import { RetrievedData, Statistics } from './Interfaces'
import { API } from './VARS'


function Stats() {
  const data: RetrievedData = useContext(DataContext);
  const [stats, setStats] = useState({temperature:{min:0,avg:0,max:0,unit:"°C"}, top_queried:"Unknown"} as Statistics)
  
  useEffect(()=>
  {
    fetch("http://"+API+":8000/weathers/statistics")
    .then((r) => r.json())
      .then((r: Statistics)=> {console.log(r); setStats(r)})
        .finally(()=>console.log("STATS DONE"));
  }, [])

  return (
    <div id="stats">
      <div className="statbox" id='city'>
        <p>Most searched city:</p>
        <p className='x2'>{stats.top_queried}</p>
      </div>
      <div className="statbox" id='temperatures'>
        <p className='x2'>Temperatures ({stats.temperature.unit})</p>
        <p>Minimum: {stats.temperature.min || "Unknown"}</p>
        <p>Maximum: {stats.temperature.max || "Unknown"}</p>
        <p>Average: {stats.temperature.avg || "Unknown"}</p>
      </div>
      <div className="statbox" id='total'>
        <p>Total number of searches:</p>
        <p className='x2'>{data.total}</p>
      </div>
    </div>
  )
}

export default Stats