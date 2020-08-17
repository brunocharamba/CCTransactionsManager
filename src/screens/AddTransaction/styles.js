import { StyleSheet } from 'react-native'
import { theme } from '../../globals'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor
  },
  form: {
    margin: theme.mediumSpacing,
    paddingVertical: theme.mediumSpacing,
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
  formGroup: {
    marginHorizontal: theme.mediumSpacing,
    marginVertical: theme.smallSpacing
  },
  formGroupTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.darkBlueColor
  },
  formGroupInput: {
    backgroundColor: theme.whiteColor,
    borderRadius: 2,
    height: 33,
    marginTop: theme.smallSpacing,
    paddingHorizontal: theme.mediumSpacing,
    color: theme.darkBlueColor,
    fontWeight: 'bold'
  },
  formGroupValue: (type) => ({
    backgroundColor: theme.whiteColor,
    borderRadius: 2,
    height: 33,
    marginTop: theme.smallSpacing,
    paddingHorizontal: theme.mediumSpacing,
    color: type === 'withdraw' ? theme.redColor : theme.greenColor,
    fontWeight: 'bold'
  }),
  formGroupDate: {
    backgroundColor: theme.whiteColor,
    borderRadius: 2,
    height: 33,
    marginTop: theme.smallSpacing,
    paddingHorizontal: theme.mediumSpacing,
    color: theme.darkBlueColor,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  formGroupPicker: (type) => ({
    backgroundColor: theme.whiteColor,
    borderRadius: 2,
    height: 33,
    marginTop: theme.smallSpacing,
    paddingHorizontal: theme.mediumSpacing,
    color: type === 'withdraw' ? theme.redColor : theme.greenColor,
    fontWeight: 'bold'
  }),
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: theme.mediumSpacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    flex: 0.5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSave: {
    backgroundColor: theme.greenColor,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  buttonClear: {
    backgroundColor: theme.redColor,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.cardColor
  },
  dateTitle: {
    fontWeight: 'bold',
    color: theme.darkBlueColor
  },
  greenColor: {
    color: theme.greenColor,
    backgroundColor: theme.greenColor
  },
  redColor: {
    color: theme.redColor,
    backgroundColor: theme.redColor
  }
})

export default styles
