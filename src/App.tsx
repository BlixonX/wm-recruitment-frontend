import React, { ReactElement, useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import Map from './Map'
import History from './History'
import './App.css';
import { API_PROTOCOL, API_HOST, API_PORT, GMAPS_API_KEY } from './VARS'
import { DataContext, CoordinateContext } from './Context'
import { Coordinates, RetrievedData } from './Interfaces'

function App() {
  const [data, setData] = useState({records: [], total: -1} as RetrievedData);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0} as Coordinates);
  const [page, setPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(false);


  async function loadData() 
  {
    setIsPageLoading(true);
    await fetch(`${API_PROTOCOL}//${API_HOST}${API_PORT}/weathers/history?limit=10&page=${page}`)
    .then((r) => r.json())
      .then((r: RetrievedData)=> setData(r))
    setIsPageLoading(false);
  }

  async function search(coordinates: Coordinates)
  {
    setIsPageLoading(true);
    await fetch(`${API_PROTOCOL}//${API_HOST}${API_PORT}/weathers/search-by-coordinates?lat=${coordinates.lat}&lon=${coordinates.lng}`)
    loadData()
  }

  useEffect(()=>{loadData()},[page])


  return (
    <>
    <div id="search">
      {isPageLoading ?
      <button id="searchBtn" className="unclickable">Loading</button>
      :
      <button id="searchBtn" onClick={ ()=>{search(coordinates)} }>Search</button>
    }
    </div>

    <CoordinateContext.Provider value={setCoordinates}>
    <Wrapper apiKey={GMAPS_API_KEY} render={renderMap} >
      <Map center={{lat: 50.19651190093056, lng: 18.743207547749222}} zoom={8} >
      </Map>
    </Wrapper>
    </CoordinateContext.Provider>

    {data.total == -1 ? <div id="loading">Loading</div>
    :
    <>
    <DataContext.Provider value={data}>
      <History/>
    </DataContext.Provider>
    
    <nav>
        <pre>
          {isPageLoading ? "Loading" : 
          <>
          <span className={"navBtn"+(page == 1 ? " navButtonLimit" : "")}
          onClick={()=> setPage(page-1)}>&larr;</span>

          <span style={{marginLeft: "70px", marginRight: "70px"}}>{page}</span>

          <span className={"navBtn"+(data.total%(page*10) > 0 && data.total > page*10 ? "" : " navButtonLimit")}
          onClick={()=> setPage(page+1)}>&rarr;</span>
          </>
          }
        </pre>
    </nav>
    </>
    }
    </>
  );
}

function renderMap(status: Status): ReactElement
{
  if (status === Status.LOADING) return <h3 className='mapStatus'>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3 className='mapStatus'>{status} ...</h3>;
  return <></>; 
}

export default App;
