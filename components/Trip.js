import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Divider, Title, List, Text } from 'react-native-paper';
import Header from './Header';

const Trip = ({ route, navigation }) => {
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
                <List.Accordion title={member} key={i}>
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
                <List.Accordion title={member} key={i}>
                  {route.params.splits
                    .filter(split => split.member === member)
                    .map((split, i) => split.owes
                    .map((owe, i) => {
                      return <List.Item
                        key={i}
                        style={styles.listItem}
                        title={owe.member} 
                        left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />}
                        right={() => <Text style={{ alignSelf: 'center', paddingRight: '10%' }}>${owe.amount}</Text>}
                      />
                    }))}
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