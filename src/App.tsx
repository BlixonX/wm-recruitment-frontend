import React, { ReactElement, useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import Map from './Map'
import History from './History'
import './App.css';
import { API } from './VARS'
import { DataContext } from './Context'
import { RetrievedData } from './Interfaces'

function App() {
  const [data, setData] = useState({records: [], total: 0} as RetrievedData);

  useEffect(()=>
  {
    console.log(data);
    fetch("http://"+API+":8000/weathers/history?limit=10&page=1")
    .then((r) => r.json())
      .then((r: RetrievedData)=> {console.log(r); setData(r)})
        .finally(()=>console.log("DONE"));
  },[])


  return (
    <DataContext.Provider value={data}>
      <div id="search">
        <button id="searchBtn">Search</button>
      </div>
      <Wrapper apiKey='AIzaSyDJECKH9vL86AB8kE1xsqTeOw5Xgkx3N94' render={renderMap} >
        <Map center={{lat: 50.19651190093056, lng: 18.743207547749222}} zoom={8} >
        </Map>
      </Wrapper>
      <History/>
      {/* <div id="history">
        <div id="stats"></div>
        <div id="list"></div>
      </div> */}
      <div id="modal">

      </div>
    </DataContext.Provider>
  );
}

function renderMap(status: Status): ReactElement
{
  if (status === Status.LOADING) return <h3 className='mapStatus'>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3 className='mapStatus'>{status} ...</h3>;
  return <></>; 
}

export default App;
