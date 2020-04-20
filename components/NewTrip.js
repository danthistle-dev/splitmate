import React, { useState } from 'react';
import Header from './Header';
import { View, StyleSheet } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

const NewTrip = ({ navigation }) => {
  const [name, setName] = useState('');

  return(
    <View style={{ height: '100%' }}>
      <Header title="New trip" />
      <TextInput 
        label="Trip name"
        value={name}
        onChangeText={name => setName(name)}
      />
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
      />
      <FAB 
        label="Cancel"
        icon="close"
        style={styles.cancel}
        color="white"
        onPress={() => navigation.navigate('Trips')}
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
  }
});

export default NewTrip;