import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import TransactionItem from '../../components/TransactionItem'
import TransactionFooter from '../../components/TransactionFooter'

import styles from './styles'

const Transactions = () => {
  const [data, setData] = useState({ transactions: [], total: 0 })

  // load
  useEffect(() => {
    const load = async () => {
      await loadTransactions()
    }
    load()
  }, [])

  const saveTransaction = async (transaction) => {
    try {
      const json = JSON.stringify({
        transactions: [...data.transactions, transaction],
        total: data.total + transaction.value
      })

      await AsyncStorage.setItem('@transaction_data', json)

      await loadTransactions()
    } catch (e) {
      console.error(e)
      // saving error
    }
  }

  const loadTransactions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@transaction_data')
      const data = JSON.parse(jsonValue)

      if (data === null) return

      console.log(data)

      setData({
        transactions: data.transactions,
        total: data.total
      })
    } catch (e) {
      console.error(e)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TransactionItem name={item.name} value={item.value} date={item.date} />
    )
  }

  const renderFooter = () => {
    return <TransactionFooter value={data.total} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, styles.bar]}>
        <Text style={styles.title}>TRANSACTIONS</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, styles.listWrapper]}>
        <FlatList
          style={styles.list}
          data={data.transactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
        />
      </View>
      <View style={[styles.card, styles.bar]}>
        <Text style={styles.balanceTitle}>BALANCE</Text>
        <Text style={styles.balanceValue(data.total)}>${data.total}</Text>
      </View>
      {/* <TouchableOpacity
        onPress={async () =>
          saveTransaction({ date: '1111', name: 'nome', value: 123 })
        }
      >
        <Text>ADD</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Transactions
