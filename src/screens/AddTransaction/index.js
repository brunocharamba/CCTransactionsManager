import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment'

import { Creators as Actions } from '../../store/transactions'
import styles from './styles'

const AddTransaction = ({ navigation }) => {
  const [formData, setFormData] = useState({
    description: '',
    type: null,
    category: null,
    date: new Date(),
    value: 0,
    textValue: 0
  })
  const [dateModal, setDateModal] = useState(false)
  const store = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  const showDatePicker = () => {
    setDateModal(true)
  }

  const hideDatePicker = () => {
    setDateModal(false)
  }

  const handleConfirm = (date) => {
    // setDate(new Date(date))
    setFormData({ ...formData, date: new Date(date) })
    hideDatePicker()
  }

  const handleClear = () => {
    setFormData({
      description: '',
      type: null,
      category: '',
      date: new Date(),
      value: 0,
      textValue: 'R$0,00'
    })
  }

  const handleAdd = () => {
    let error = false

    if (!formData.description || formData.description.length > 100) error = true
    if (!formData.type || !formData.category) error = true
    if (formData.value === 0 || formData.value.length > 20) error = true

    if (error) {
      Alert.alert(
        'ERRO AO SALVAR A TRANSAÇÃO',
        'Um ou mais campos não foram digitados corretamente. Para prosseguir, preencha todos os campos.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      )

      return
    }

    const newTransaction = {
      id: Date.now(),
      name: formData.description,
      type: formData.type,
      category: formData.category,
      date: formData.date,
      value: formData.type === 'withdraw' ? -formData.value : formData.value
    }

    // order
    let orderedTransactions = [...store.transactions, newTransaction]
    orderedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

    dispatch(
      Actions.setTransactions({
        transactions: [...orderedTransactions],
        total: store.total + newTransaction.value
      })
    )

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formGroupTitle}>Descrição</Text>
          <TextInput
            placeholder="Digite uma descrição..."
            style={styles.formGroupInput}
            value={formData.description}
            maxLength={100}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          ></TextInput>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formGroupTitle}>Tipo</Text>
          <RNPickerSelect
            key="typeKey"
            placeholder={{ label: 'Selecione um item...' }}
            style={{
              inputIOS: styles.formGroupPicker(formData.type),
              inputAndroid: styles.formGroupPicker(formData.type)
            }}
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
            items={[
              {
                label: 'Deposit',
                value: 'deposit',
                color: styles.greenColor.color
              },
              {
                label: 'Withdraw',
                value: 'withdraw',
                color: styles.redColor.color
              }
            ]}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formGroupTitle}>Categoria</Text>
          <RNPickerSelect
            test-category
            placeholder={{ label: 'Selecione um item...' }}
            style={{
              inputIOS: styles.formGroupInput,
              inputAndroid: styles.formGroupInput
            }}
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            items={[
              { label: 'Services', value: 'services' },
              { label: 'Food', value: 'food' },
              { label: 'Utilities', value: 'utilities' },
              { label: 'Taxes', value: 'taxes' },
              { label: 'Income', value: 'income' }
            ]}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formGroupTitle}>Data</Text>
          <TouchableOpacity
            style={styles.formGroupDate}
            onPress={showDatePicker}
          >
            <Text style={styles.dateTitle}>
              {moment(formData.date).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formGroupTitle}>Valor</Text>
          {/* <Text style={styles.formGroupInput}></Text> */}
          <TextInputMask
            placeholder="0"
            style={styles.formGroupValue(formData.type)}
            type={'money'}
            maxLength={20}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: formData.type === 'withdraw' ? '- R$' : 'R$'
            }}
            includeRawValueInChangeText={true}
            value={formData.textValue}
            onChangeText={(maskedText, rawText) => {
              setFormData({
                ...formData,
                textValue: maskedText,
                value: rawText
              })
            }}
          />
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClear]}
          onPress={handleClear}
        >
          <Text style={styles.textButton}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSave]}
          onPress={handleAdd}
        >
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={dateModal}
        mode="date"
        locale="pt_BR"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

export default AddTransaction
