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

const Transactions = ({ navigation }) => {
  // const [data, setData] = useState({ transactions: [], total: 0 })
  const data = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  // ao renderizar, carregar as transações
  useEffect(() => {
    const load = async () => {
      await loadTransactions()
    }
    load()
  }, [])

  // quando houver mudança nos dados, salva no async storage
  useEffect(() => {
    const save = async () => {
      try {
        const json = JSON.stringify({
          transactions: data.transactions,
          total: data.total
        })

        await AsyncStorage.setItem('@transaction_data', json)
      } catch (e) {
        console.error(e)
        // saving error
      }
    }
    save()
  }, [data])

  // adiciona a transação no redux
  const saveTransaction = (transaction) => {
    dispatch(
      Actions.setTransactions({
        transactions: [...data.transactions, transaction],
        total: data.total + transaction.value
      })
    )
  }

  // carrega as informações do async storage no estado do redux
  const loadTransactions = async () => {
    try {
      const json = await AsyncStorage.getItem('@transaction_data')
      const storageData = JSON.parse(json)

      if (storageData === null) return

      // ordenar
      var orderedTransactions = storageData.transactions
      orderedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

      dispatch(
        Actions.setTransactions({
          transactions: orderedTransactions,
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
        <Text style={styles.title}>TRANSAÇÕES</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTransaction')}
        >
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
            <Text style={styles.emptyListTitle}>Sem transações</Text>
          )}
        />
      </View>
      <View style={[styles.card, styles.bar]}>
        <Text style={styles.balanceTitle}>SALDO</Text>
        <Text style={styles.balanceValue(data.total)}>
          {currency(data.total, {
            symbol: 'R$ ',
            separator: '.',
            decimal: ','
          }).format()}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Transactions
