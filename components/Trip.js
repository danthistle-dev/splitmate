import React from 'react';

import { useSelector } from 'react-redux';

import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Divider, Title, List, Text, Button } from 'react-native-paper';
import Header from './Header';

const Trip = ({ route, navigation }) => {
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);
  const expenses = useSelector(state => state.expenses);
  const trip = trips.byId[route.params.id];

  return(
    <View>
      <Header title={trip.name} back edit={route.params.id} nav={navigation} />
      <SafeAreaView>
        <ScrollView style={{ height: '80%' }}>
          <Title style={styles.title}>Expenses</Title>
          <Divider />
          <List.Section>
            {trip.members.map((member, i) => {
              return(
                <List.Accordion title={users.byId[member].name} key={i}>
                  {users.byId[member].expenses
                    .map((exp, i) => {
                      return <List.Item
                        key={i}
                        style={styles.listItem}
                        title={expenses.byId[exp].name} 
                        left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />}
                        right={props => {
                          return <>
                            <Text style={{ alignSelf: 'center', paddingRight: '10%' }}>${expenses.byId[exp].cost}</Text>
                            <List.Icon {...props} icon="circle-edit-outline" />
                          </>
                        }}
                        onPress={() => navigation.navigate('Edit Expense', { id: exp, trip: route.params.id })}
                      />
                    })}
                </List.Accordion>
              );
            })}
          </List.Section>

          <Title style={styles.title}>Splits</Title>
          <Divider />
          <List.Section>
            {trip.members.map((member, i) => {
              return(
                <List.Accordion title={users.byId[member].name} key={i}>
                  {Object.keys(users.byId[member].owes)
                    .map((id, i) => {
                      return <List.Item
                        key={i}
                        style={styles.listItem}
                        title={`owes ${users.byId[id].name}`} 
                        left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />}
                        right={() => <Text style={{ alignSelf: 'center', paddingRight: '10%' }}>${users.byId[member].owes[id]}</Text>}
                      />
                  })}
                </List.Accordion>
              );
            })}
          </List.Section>
        </ScrollView>
      </SafeAreaView>
      <Divider />
      <Button
        icon="cart-plus"
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('New Expense', route.params )}
      >
        add expense
      </Button>
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
  listItem: {
    backgroundColor: 'lightgrey',
    display: 'flex'
  }
});

export default Trip;