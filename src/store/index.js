import { createStore, combineReducers } from 'redux'
import transactions from './transactions'

const reducers = combineReducers({ transactions })
const Store = createStore(reducers)

export default Store
