import React, { useContext } from 'react'
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
    </>
    )
}

export default History