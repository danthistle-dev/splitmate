import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { TextInput, FAB, Dialog, Portal, Paragraph, Button } from 'react-native-paper';
import { editTrip, editUser, toggleComplete } from '../actions';
import Header from './Header';

const EditTrip = ({ navigation, route }) => {
  const tripId = route.params;
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState(trips.byId[tripId].name);
  const [members, setMembers] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    var obj = {};
    for (var i = 0; i < trips.byId[tripId].members.length; i++) {
      obj = Object.assign({ [trips.byId[tripId].members[i]]: users.byId[trips.byId[tripId].members[i]].name }, obj);
    }
    setMembers(obj);
  }, []);

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
            value={members[member]}
            onChangeText={text => setMembers({ ...members, [member]: text })}
          />
      })}
      <FAB 
        label="Save"
        icon="check"
        style={styles.save}
        disabled={name === '' || name === ' ' || Object.values(members).indexOf(' ') > -1 || Object.values(members).indexOf('') > -1}
        onPress={() => {
          dispatch(editTrip({ name, id: tripId }));
          dispatch(editUser({ members, ids: trips.byId[tripId].members }));
          navigation.goBack();
        }}
      />
      <FAB 
        label="conclude trip"
        icon="check"
        style={styles.cancel}
        color="white"
        onPress={() => setVisible(true)}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{`Are you sure you want to conclude the trip?`}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              dispatch(toggleComplete({ id: tripId }));
              setVisible(false);
              navigation.navigate('Home');
            }}>yes</Button>
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
    backgroundColor: 'darkcyan',
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0
  }
});

export default EditTrip;