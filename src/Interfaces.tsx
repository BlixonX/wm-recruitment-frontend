export interface RetrievedData
{
    records: Array<DataRecord>
    total: number
}

export interface DataRecord
{
    id: number,
    city: string,
    country: string,
    lat: number,
    lon: number,
    weather: 
    {
        id: number,
        temperature_value: string,
        temperature_unit: string,
        clouds: string,
        wind: 
        {
            speed:
            {
                value: number,
                unit: string,
                description: string
            },
            direction:
            {
                value: number,
                unit: string,
                description: string
            }
        },
        description: string,
        image_url: string
    },
    created_at: string
}

export interface Statistics
{
    temperature:
    {
        min: number,
        avg: number,
        max: number,
        unit: string
    },
    top_queried: string
}

export interface Coordinates
{
    lat: number,
    lng: number
}