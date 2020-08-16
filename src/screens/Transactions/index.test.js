import 'react-native'
import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store' //ES6 modules
import Transactions from './index'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

const middlewares = []
const mockStore = configureStore(middlewares)
const setTransactions = () => ({ type: 'SET_TRANSACTIONS' })

const listData = {
  transactions: [
    {
      id: 4,
      date: '2020-08-14T09:29:16.276Z',
      name: 'Internet bill',
      category: 'Services',
      type: 'withdraw',
      value: '145'
    },
    {
      id: 3,
      date: '2020-08-13T04:19:16.276Z',
      name: 'Groceries',
      category: 'Food',
      type: 'withdraw',
      value: '73'
    },
    {
      id: 2,
      date: '2020-08-12T13:20:16.276Z',
      name: 'Tax restitution',
      category: 'Taxes',
      type: 'deposit',
      value: '806'
    },
    {
      id: 1,
      date: '2020-08-11T07:44:16.276Z',
      name: 'Cellphone aquisition',
      category: 'Utilities',
      type: 'withdraw',
      value: '1199'
    },
    {
      id: 0,
      date: '2020-08-09T19:12:16.276Z',
      name: 'Initial deposit',
      category: 'Income',
      type: 'deposit',
      value: '700'
    }
  ],
  total: 1000
}

const newTransaction = {
  id: 999,
  date: new Date(),
  name: 'Test Input',
  category: 'Utilities',
  type: 'withdraw',
  value: '99'
}

describe('testing Transactions component', () => {
  it('renders correctly', () => {
    let store = mockStore(listData)

    const transactions = renderer
      .create(
        <Provider store={store}>
          <Transactions />
        </Provider>
      )
      .toJSON()
    expect(transactions).toBeTruthy()
  })

  it('flatlist received data', () => {
    const { props } = renderer
      .create(
        <FlatList
          data={listData.transactions}
          keyExtractor={(item, index) => index.toString()}
        />
      )
      .toJSON()
    expect(props.data.length).toEqual(listData.transactions.length)
    expect(props.data[0].name).toEqual(listData.transactions[0].name)
  })
})

describe('testing Redux actions', () => {
  it('should save transactions in redux state', () => {
    const store = mockStore(listData)

    store.dispatch(setTransactions())

    const actions = store.getActions()
    const payload = { type: 'SET_TRANSACTIONS' }
    expect(actions).toEqual([payload])
  })
})
