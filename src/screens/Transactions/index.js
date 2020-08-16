import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import currency from 'currency.js'
import { Creators as Actions } from '../../store/transactions'

import TransactionItem from '../../components/TransactionItem'

import styles from './styles'

const Transactions = () => {
  // const [data, setData] = useState({ transactions: [], total: 0 })
  const data = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

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
      const json = await AsyncStorage.getItem('@transaction_data')
      const storageData = JSON.parse(json)

      if (storageData === null) return

      dispatch(
        Actions.setTransactions({
          transactions: storageData.transactions,
          total: storageData.total
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TransactionItem
        id={item.id}
        name={item.name}
        type={item.type}
        category={item.category}
        value={item.value}
        date={item.date}
      />
    )
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
          contentContainerStyle={
            data.transactions?.length === 0 && styles.emptyList
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListTitle}>No transactions</Text>
          )}
        />
      </View>
      <View style={[styles.card, styles.bar]}>
        <Text style={styles.balanceTitle}>BALANCE</Text>
        <Text style={styles.balanceValue(data.total)}>
          {currency(data.total, {
            symbol: 'R$ ',
            separator: '.',
            decimal: ','
          }).format()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          let rnd = Math.random() < 0.5

          saveTransaction({
            id: Math.random() * 1000000,
            date: new Date(),
            name: 'nome',
            type: rnd < 0.5 ? 'withdraw' : 'deposit',
            category: 'UTILITIES',
            value: rnd < 0.5 ? -Math.random() * 2001 : Math.random() * 2001
          })
        }}
      >
        <Text>ADD</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear()
        }}
      >
        <Text>CLEAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Transactions
