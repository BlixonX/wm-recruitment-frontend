import React from 'react'

function Record(props: any) {
    return (
        <div className='record'>
            <div className="recordId">{props.data.id}</div>
            <p className='recordProp'>Country: {props.data.country || "Unknown"}</p>
            <p className='recordProp'>City: {props.data.city || "Unknown"}</p>
            <p className='recordProp'>Latitude: {props.data.lat.toFixed(2)}</p>
            <p className='recordProp'>Longitude: {props.data.lon.toFixed(2)}</p>

            <div className='recordRight'>
                <div className="recordDescription">{props.data.weather.description}</div>
                <div className="recordDate">{props.data.created_at}</div>
            </div>
            <div className="details">
                <p className="x2">Weather details</p>
                <p>Temperature: {props.data.weather.temperature_value + props.data.weather.temperature_unit}</p>
                <p>Clouds: {props.data.weather.clouds}%</p>
                <p>Wind speed: {props.data.weather.wind.speed.value + props.data.weather.wind.speed.unit} - {props.data.weather.wind.speed.description}</p>
                <p>Wind direction: {props.data.weather.wind.direction.value}° ({props.data.weather.wind.direction.unit} - {props.data.weather.wind.direction.description})</p>
            </div>
        </div>
    )
}

export default Record

// https://dev.to/jorik/country-code-to-flag-emoji-a21
// This function can be used as an alternative to country codes, however it might not work on all browsers such as Opera and Brave.
function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}