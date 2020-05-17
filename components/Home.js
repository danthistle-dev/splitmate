import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { List, Title, Divider, FAB, Text, Paragraph, Dialog, Portal, Button } from 'react-native-paper';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Header from './Header';

const Home = ({ navigation }) => {
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);
  const expenses = useSelector(state => state.expenses);

  const [visible, setVisible] = useState(false);

  console.log(visible);

  return(
    <View style={{height: '100%'}}>
      <Header title="Splitmate" settings={() => setVisible(true)} />
      <Title style={styles.title}>Your trips</Title>
      <Divider />
      {trips.allIds !== [] ? (
        <List.Section>
          {trips.allIds.map((id, i) => (
            <List.Item 
              key={i} 
              title={trips.byId[id].name} 
              left={props => <List.Icon {...props} icon="airplane" />}
              onPress={() => navigation.navigate('Trip', { id: id })}
            />))}
        </List.Section>         
      ) : <Text>You don't have any trips yet! Add a trip to get started.</Text>}
      <FAB 
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('New Trip')}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete all saved data?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              AsyncStorage.clear();
              setVisible(false);
            }}>yes</Button>
            <Button onPress={() => setVisible(false)}>cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 10,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10
  },
  list: {

  },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 10,
    left: '38%',
    backgroundColor: '#fe9798'
  }
});

export default Home;
