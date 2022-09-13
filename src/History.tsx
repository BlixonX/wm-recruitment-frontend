import React, { useContext, useEffect, ReactElement } from 'react'
import Record from './Record'
import Stats from './Stats'
import { DataContext } from './Context'
import { RetrievedData } from './Interfaces'

function History() {
    const data: RetrievedData = useContext(DataContext);

    return (
    <>
        <Stats/>
        <div id="list">
        {data.records.map((record, index) => {
            return <Record key={index} data={record} />
        })}
        </div>
        <nav>
            <pre>
            <span>&larr;</span>
            <span style={{marginLeft: "70px", marginRight: "70px"}}>1</span>
            <span>&rarr;</span>
            </pre>
        </nav>
    </>
    )
}

export default History