import React from 'react'
import { RetrievedData } from './Interfaces'

export const DataContext = React.createContext({records: [], total: 0} as RetrievedData);