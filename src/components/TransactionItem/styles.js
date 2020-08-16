import { StyleSheet } from 'react-native'
import { theme } from '../../globals'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.smallSpacing
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderColor: theme.darkBlueColor,
    borderRightWidth: 1.5,
    paddingRight: theme.mediumSpacing
  },
  dateTop: {
    fontWeight: 'bold',
    color: theme.darkBlueColor,
    textTransform: 'uppercase'
  },
  dateBottom: {
    color: theme.darkBlueColor,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: -3
  },
  name: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  description: (type) => ({
    color: type === 'deposit' ? theme.greenColor : theme.redColor,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }),
  category: (type) => ({
    color: type === 'deposit' ? theme.greenColor : theme.redColor,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }),
  buttonWrapper: {
    justifyContent: 'center'
  },
  removeButton: {
    backgroundColor: theme.lightRedColor,
    height: 18,
    width: 18,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    justifyContent: 'center'
  },
  textButton: {
    color: theme.cardColor,
    fontWeight: 'bold'
  },
  textValue: (type) => ({
    color: type === 'deposit' ? theme.greenColor : theme.redColor,
    fontWeight: 'bold'
  })
})

export default styles
