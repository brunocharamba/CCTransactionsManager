import 'react-native'
import React from 'react'
import { FlatList, View, Text } from 'react-native'
import Transactions from './index'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

const listData = [
  {
    id: '4',
    date: '2020-08-14T09:29:16.276Z',
    name: 'Internet bill',
    type: 'withdraw',
    value: '145'
  },
  {
    id: '3',
    date: '2020-08-13T04:19:16.276Z',
    name: 'Groceries',
    type: 'withdraw',
    value: '73'
  },
  {
    id: '2',
    date: '2020-08-12T13:20:16.276Z',
    name: 'Tax restitution',
    type: 'deposit',
    value: '806'
  },
  {
    id: '1',
    date: '2020-08-11T07:44:16.276Z',
    name: 'Cellphone aquisition',
    type: 'withdraw',
    value: '1199'
  },
  {
    id: '0',
    date: '2020-08-09T19:12:16.276Z',
    name: 'Initial deposit',
    type: 'deposit',
    value: '700'
  }
]

describe('testing Transactions component', () => {
  it('renders correctly', () => {
    const transactions = renderer.create(<Transactions />).toJSON()
    expect(transactions).toBeTruthy()
  })

  it('flatlist received data', () => {
    const { props } = renderer
      .create(
        <FlatList
          data={listData}
          keyExtractor={(item, index) => index.toString()}
        />
      )
      .toJSON()
    expect(props.data.length).toEqual(listData.length)
    expect(props.data[0].name).toEqual(listData[0].name)
  })

  it('account balance is calculated right', () => {
    const finalBalance = 89
    // TO DO
  })
})
