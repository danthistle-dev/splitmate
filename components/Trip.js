import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import initOwes from '../actions';

import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Divider, Title, List, Text } from 'react-native-paper';
import Header from './Header';

const Trip = ({ route, navigation }) => {
  console.log(route.params)
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  console.log(users.byId[route.params.members[0]].owes);

  return(
    <View>
      <Header title={route.params.name} back nav={navigation} />
      <SafeAreaView>
        <ScrollView style={{ height: '85%' }}>
          <Title style={styles.title}>Expenses</Title>
          <Divider />
          <List.Section>
            {route.params.members.map((member, i) => {
              return(
                <List.Accordion title={users.byId[member].name} key={i}>
                  {route.params.expenses
                    .filter(exp => exp.payer === member)
                    .map((exp, i) => {
                      return <List.Item
                        key={i}
                        style={styles.listItem}
                        title={exp.name} 
                        left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />}
                        right={() => <Text style={{ alignSelf: 'center', paddingRight: '10%' }}>${exp.cost}</Text>}
                      />
                    })}
                </List.Accordion>
              );
            })}
          </List.Section>

          <Title style={styles.title}>Splits</Title>
          <Divider />
          <List.Section>
            {route.params.members.map((member, i) => {
              return(
                <List.Accordion title={users.byId[member].name} key={i}>
                  {console.log(Object.keys(users.byId[member].owes))}
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