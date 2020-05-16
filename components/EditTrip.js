import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import Header from './Header';

const EditTrip = ({ navigation, route }) => {
  const tripId = route.params;
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);

  const [name, setName] = useState(trips.byId[tripId].name);

  return (
    <View style={{ height: '100%' }}>
      <Header title="Edit trip" back nav={navigation} />
      <TextInput 
        label="Trip name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {trips.byId[tripId].members
        .map((member, i) => {
          return <TextInput
            key={i}
            label={`Member ${i + 1}`}
            value={users.byId[member].name}
          />
      })}
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

export default EditTrip;