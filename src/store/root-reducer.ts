import { combineReducers } from '@reduxjs/toolkit'
import pokemon from './pokemon'

const rootReducer = combineReducers({ pokemon })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
