import React from 'react';
import { List, Title, Divider, FAB, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import data from '../test.json';

const Trips = ({ navigation }) => {
  return(
    <View style={{height: '100%'}}>
      <Header title="Splitmate" />
      <Title style={styles.title}>Your trips</Title>
      <Divider />
      {data ? (
        <List.Section>
          {data.map((trip, i) => <List.Item key={i} title={trip.name} onPress={() => console.log('Pressed')} />)}
        </List.Section>         
      ) : (
        <Text>You don't have any trips yet! Add a trip to get started.</Text>
      )}
      <FAB 
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('New Trip')}
      />
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

export default Trips;
