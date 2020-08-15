import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

const TransactionFooter = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
    </View>
  )
}

export default TransactionFooter
