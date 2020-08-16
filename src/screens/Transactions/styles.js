import { StyleSheet } from 'react-native'
import { theme } from '../../globals'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor
  },
  card: {
    margin: theme.mediumSpacing,
    borderRadius: theme.mediumRadius,
    backgroundColor: theme.cardColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  listWrapper: {
    flex: 1,
    justifyContent: 'center'
    // alignItems: 'center'
  },
  list: {
    flex: 1,
    margin: theme.mediumSpacing,
    borderRadius: theme.mediumRadius,
    backgroundColor: theme.cardColor
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%'
  },
  emptyListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.darkBlueColor
  },
  title: {
    color: theme.darkBlueColor,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10
  },
  addButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.greenColor,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  textButton: {
    color: theme.cardColor,
    fontSize: 30,
    fontWeight: 'bold'
  },
  balanceTitle: {
    color: theme.darkBlueColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  balanceValue: (value) => ({
    color: value >= 0 ? theme.greenColor : theme.redColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  })
})

export default styles
