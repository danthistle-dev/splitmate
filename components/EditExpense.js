import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import Header from './Header';

const EditExpense = ({ navigation, route }) => {
  const expenseId = route.params.id;
  const expenses = useSelector(state => state.expenses);

  const [name, setName] = useState(expenses.byId[expenseId].name);

  return (
    <View style={{ height: '100%' }}>
      <Header title="Edit expense" back nav={navigation} />
      <TextInput 
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
        disabled
        onPress={() => console.log('Trip saved.')}
      />
      <FAB 
        label="Delete"
        icon="close"
        style={styles.cancel}
        color="white"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  save: {
    position: 'absolute',
    margin: 20,
    bottom: 0,
    left: 0
  },
  cancel: {
    backgroundColor: 'crimson',
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0
  }
});

export default EditExpense;