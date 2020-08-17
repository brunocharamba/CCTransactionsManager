import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Store from './store'
import Transactions from './screens/Transactions'
import AddTransaction from './screens/AddTransaction'

import { theme } from './globals'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={Transactions}
            name="Transactions"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={AddTransaction}
            name="AddTransaction"
            options={{
              title: 'ADICIONAR TRANSAÇÃO'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default Navigation
