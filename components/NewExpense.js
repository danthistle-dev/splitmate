import React, { useState, StrictMode } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../actions';

import { SafeAreaView, ScrollView, View, StyleSheet, Picker } from 'react-native';
import { TextInput, FAB, Text, List, Checkbox } from 'react-native-paper';
import uuid from 'random-uuid-v4';

import Header from './Header';

'use strict';

const NewExpense = ({ navigation, route }) => {
  const tripId = route.params.id;
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [payer, setPayer] = useState(trips.byId[tripId].members[0]);
  const [checks, setChecks] = useState(trips.byId[tripId].members.map(() => false));
  
  const getUsers = (users, check) => {
    let arr = [];
    let tmp = check.slice(0);
    tmp.length = tmp.length - 1;
    for (var i = 0; i < checks.length; i++) {
      if (tmp[i]) {
        arr.push(users[i])
      }
    }
    return arr;
  }

  return(
    <View style={{ height: '100%' }} onPress={() => textRef.blur()}>
      <Header title="New expense" />
      <SafeAreaView style={{ height: '60%' }}>
        <ScrollView>
          <TextInput 
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            label="Cost"
            keyboardType="numeric"
            value={cost}
            onChangeText={num => setCost(num)}
            maxLength={7}
          />
          <List.Accordion title={`Who paid?: ${users.byId[payer].name}`}>
            <Picker
              selectedValue={payer}
              style={{ backgroundColor: '#ffe9e9' }}
              onValueChange={(value, index) => setPayer(value)}
            >
              {trips.byId[tripId].members.map((member, i) => {
                return <Picker.Item label={users.byId[member].name} value={member} key={i} />
              })}
            </Picker>
          </List.Accordion>
          <List.Accordion title="Select who used this expense">
            {trips.byId[tripId].members
            .filter(member => member !== payer)
            .map((member, i) => {
              return <Checkbox.Item
                key={i} 
                style={{ width: '40%' }} 
                label={users.byId[member].name} 
                status={checks[i] ? "checked" : "unchecked"} 
                onPress={() => setChecks(curr => curr.map((x, y) => y === i ? !checks[i] : checks[y]))} 
              />
            })}
          </List.Accordion>
        </ScrollView>
      </SafeAreaView>
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
        disabled={name === '' || cost === '' || checks.includes(true) ? false : true}
        onPress={() => {
          dispatch(addExpense({ 
            id: uuid(), 
            trip: tripId, 
            name, 
            cost, 
            payer, 
            users: getUsers(trips.byId[tripId].members.filter(x => x !== payer), checks)
          }));
          navigation.navigate('Trip', { id: tripId });
        }}
      />
      <FAB 
        label="Cancel"
        icon="close"
        style={styles.cancel}
        color="white"
      />
    </View>
  )
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
  }
});

export default NewExpense;