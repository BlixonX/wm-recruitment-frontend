import React from 'react'
import { RetrievedData } from './Interfaces'

export const DataContext = React.createContext({records: [], total: -1} as RetrievedData);

export const CoordinateContext = React.createContext(null as any);