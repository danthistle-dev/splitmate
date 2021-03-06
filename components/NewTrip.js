import React, { useState, useReducer } from 'react';

import { useDispatch } from 'react-redux';
import { createTrip, addUser, initOwes } from '../actions';

import Header from './Header';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { FAB, TextInput, List, IconButton } from 'react-native-paper';
import uuid from 'random-uuid-v4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, ''];
    case 'update':
      var newState = [...state];
      if (action.payload.length <= 15 && action.payload !== ' ') {
        newState.splice(action.index, 1, action.payload);
      }
      return newState;
    case 'delete':
      var newState = [...state];
      newState.splice(action.index, 1);
      return newState;
    default:
      throw new Error();
  }
}

const NewTrip = ({ navigation }) => {
  const storeDispatch = useDispatch();
  const [name, setName] = useState('');
  const tripId = uuid();
  const [members, dispatch] = useReducer(reducer, []);

  const onSave = () => {
    let temp = [];
    for (var i = 0; i < members.length; i++) {
      let userId = uuid();
      storeDispatch(addUser({ id: userId, name: members[i]}));
      temp.push(userId);
    }

    for (var i = 0; i < temp.length; i++) {
      storeDispatch(initOwes({ id: temp[i], members: temp }))
    }

    storeDispatch(createTrip({ id: tripId, name, members: temp }));
  }

  return(
    <View style={{ height: '100%' }} onPress={() => textRef.blur()}>
      <Header title="New trip" />
      <TextInput 
        label="Trip name"
        value={name}
        onChangeText={name => setName(name)}
      />
      <SafeAreaView style={{ height: '60%' }}>
        <ScrollView>
          {members.map((member, i) => (
            <View style={styles.inputGroup} key={i}>
              <TextInput 
                label={`Member ${i+1}`}
                value={members[i]}
                onChangeText={(name) => dispatch({ type: 'update', index: i, payload: name})}
                style={styles.input}
              />
              <IconButton 
                icon="close"           
                size={30}
                onPress={() => dispatch({ type: 'delete', index: i })}
                style={styles.close}
              />
            </View>
          ))}
          <List.Item 
            title="Add member"
            left={props => <List.Icon {...props} icon="plus" />}
            onPress={() => dispatch({ type: 'add' })}
          />
        </ScrollView>
      </SafeAreaView>
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
        disabled={name === '' || members.length < 1 || members.includes('') ? true : false}
        onPress={() => {
          onSave();
          navigation.goBack();
        }}
      />
      <FAB 
        label="Cancel"
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
    backgroundColor: 'grey',
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    flex: 5
  },
  close: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default NewTrip;