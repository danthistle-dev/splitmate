import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Title, List } from 'react-native-paper';
import Header from './Header';

import data from '../test.json';

const Trip = ({ route, navigation }) => {
  return(
    <View>
      <Header title={route.params.name} back nav={navigation} />
      <Title style={styles.title}>Expenses</Title>
      <Divider />
      <List.Section>
        {route.params.members.map((member, i) => {
          return(
            <List.Accordion title={member} key={i}>
              <List.Item 
                title={route.params.expenses[0].name} 
                left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />} 
              />
            </List.Accordion>
          );
        })}
      </List.Section>
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
});

export default Trip;