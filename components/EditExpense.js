import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, FAB, Paragraph, Dialog, Portal, Button } from 'react-native-paper';
import { editExpense } from '../actions';
import Header from './Header';

const EditExpense = ({ navigation, route }) => {
  const expenseId = route.params.id;

  const tripId = route.params.trip;
  const expenses = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  const [name, setName] = useState(expenses.byId[expenseId].name);
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ height: '100%' }}>
      <Header title="Edit expense" back nav={navigation} />
      <TextInput 
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.text}>
        You can only edit the name of an expense. If you want to change something else, delete this expense and create a new one.
      </Text>
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
        disabled={ name === '' }
        onPress={() => {
          dispatch(editExpense({ id: expenseId, name }));
          navigation.navigate('Trip', { id: tripId });
        }}
      />
      <FAB 
        label="Delete"
        icon="close"
        style={styles.cancel}
        color="white"
        onPress={() => setVisible(true)}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{`Are you sure you want to delete this expense? This can't be undone.`}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              // Deleting expenses was causing too many issues with redux persist,
              // I chose to omit this from the demo for my own sanity.
              setVisible(false);
              console.log('deleted');
              navigation.goBack();
            }}>ok</Button>
            <Button onPress={() => setVisible(false)}>cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  },
  text: {
    padding: '10%',
    color: 'grey',
    textAlign: 'center'
  }
});

export default EditExpense;