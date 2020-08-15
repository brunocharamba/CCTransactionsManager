import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

const TransactionItem = ({ date, name, value }) => {
  return (
    <View style={styles.container}>
      <Text>{date || 'Data'}</Text>
      <Text>{name || 'Nome'}</Text>
      <Text>{value || 'Valor'} </Text>
    </View>
  )
}

export default TransactionItem
