import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Store from './store'
import Transactions from './screens/Transactions'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={Transactions}
            name="Transactions"
            options={{ title: 'Transactions', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default Navigation
