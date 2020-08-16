import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import currency from 'currency.js'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Creators as Actions } from '../../store/transactions'

import styles from './styles'

const TransactionItem = ({ id, date, name, category, type, value }) => {
  const dispatch = useDispatch()
  const dt = moment(date)

  const removeTransaction = async () => {
    try {
      const json = await AsyncStorage.getItem('@transaction_data')
      let data = JSON.parse(json)

      const newTransactions = data.transactions.filter((item) => item.id !== id)
      data.transactions = newTransactions
      data.total -= value

      await AsyncStorage.setItem('@transaction_data', JSON.stringify(data))

      dispatch(
        Actions.setTransactions({
          transactions: data.transactions,
          total: data.total
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateTop}>
          {dt.format('DD') + moment(dt).format('MMM')}
        </Text>
        <Text style={styles.dateBottom}>2020</Text>
      </View>
      <View style={styles.name}>
        <Text style={styles.description(type)}>{name}</Text>
        <Text style={styles.category(type)}>{category}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.textValue(type)}>
          {currency(value, {
            symbol: 'R$ ',
            separator: '.',
            decimal: ','
          }).format()}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={async () => await removeTransaction()}
        >
          <Text style={styles.textButton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TransactionItem
