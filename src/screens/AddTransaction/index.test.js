import 'react-native'
import { TextInput } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react-native'
import AddTransaction from './index'

jest.useFakeTimers()
const mockStore = configureStore()
const setTransactions = () => ({ type: 'SET_TRANSACTIONS' })

const listData = {
  transactions: [
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

describe('testing AddTransaction component', () => {
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((state) => [state, setState])
  let store = mockStore(listData)
  let transactions

  beforeEach(() => {
    transactions = render(
      <Provider store={store}>
        <AddTransaction />
      </Provider>
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders correctly', () => {
    expect(transactions.toJSON()).toBeTruthy()
  })

  it('renders and change description field', () => {
    const { getByPlaceholderText } = transactions

    const element = getByPlaceholderText('Digite uma descrição...')

    expect(element).toBeTruthy()
    expect(element).toHaveProp('value')

    fireEvent(element, 'onChangeText', 'teste.')

    expect(element.props.value).not.toEqual('errado.')
    expect(element.props.value).toEqual('teste.')
  })

  it('renders and change value field', () => {
    const { getByPlaceholderText } = transactions

    const element = getByPlaceholderText('0')

    expect(element).toBeTruthy()
    expect(element).toHaveProp('value')

    expect(element.props.value).toEqual('R$0,00')
    fireEvent(element, 'onChangeText', '10')
    expect(element.props.value).not.toEqual('R$0,20')
    expect(element.props.value).toEqual('R$0,10')
  })

  it('clear form inputs', () => {
    const { getByPlaceholderText } = transactions

    const input1 = getByPlaceholderText('Digite uma descrição...')
    const input2 = getByPlaceholderText('0')

    fireEvent(input1, 'onChangeText', '')
    fireEvent(input2, 'onChangeText', 'R$0,00')

    expect(input1.props.value).toEqual('')
    expect(input2.props.value).toEqual('R$0,00')
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
