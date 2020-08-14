import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Transactions from './screens/Transactions'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Transactions} name="Transactions" />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
