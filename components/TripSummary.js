import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete } from '../actions';
import { Text, Title, Portal, Dialog, Paragraph, Button, List, Divider } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

import Header from './Header';

const TripSummary = ({ navigation, route }) => {
  const tripId = route.params.id;
  const screenWidth = Dimensions.get('window').width;
  
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips);
  const users = useSelector(state => state.users);
  const expenses = useSelector(state => state.expenses);

  const totalCost = ids => {
    var total = 0;
    for (var i = 0; i < ids.length; i++) {
      total += Number(expenses.byId[ids[i]].cost);
    }
    return total;
  }

  const getPieChartData = ids => {
    var data = [];
    for (var i = 0; i < ids.length; i++) {
      data.push({
        name: users.byId[trips.byId[tripId].members[i]].name,
        paid: totalCost(users.byId[trips.byId[tripId].members[i]].expenses),
        color: '#000000'.replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      });
    }
    return data;
  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  }
  
  return(
    <View style={{ height: '100%' }}>
      <Header title="Trip summary" back nav={navigation} settings={() => setVisible(true)} />
      <SafeAreaView style={{ height: '86%' }}>
        <ScrollView>
          <View style={styles.overview}>
            <Text style={styles.subtext}>On your trip {trips.byId[tripId].name}, your group spent a total of</Text>
            <Title style={styles.info}>${totalCost(trips.byId[tripId].expenses).toFixed(2)}</Title>
            <Text style={styles.subtext}>split amongst</Text>
            <Title style={styles.info}>{trips.byId[tripId].expenses.length} expenses.</Title>
          </View>
          <PieChart 
            data={getPieChartData(trips.byId[tripId].members)}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="paid"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />    
          <Title style={styles.title}>Splits</Title>
          <Divider />
          <List.Section>
            {trips.byId[tripId].members.map((member, i) => {
              return(
                <List.Accordion title={users.byId[member].name} key={i}>
                  {Object.keys(users.byId[member].owes)
                    .map((id, i) => {
                      return <List.Item
                        key={i}
                        style={styles.listItem}
                        title={`owes ${users.byId[id].name}`} 
                        left={props => <List.Icon {...props} icon="subdirectory-arrow-right" />}
                        right={() => <Text style={{ alignSelf: 'center', paddingRight: '10%' }}>${users.byId[member].owes[id].toFixed(2)}</Text>}
                      />
                  })}
                </List.Accordion>
              );
            })}
          </List.Section>
        </ScrollView>
      </SafeAreaView>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Reactivate the trip?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setVisible(false);
              dispatch(toggleComplete({ id: tripId }));
              navigation.goBack();
            }}>yes</Button>
            <Button onPress={() => setVisible(false)}>cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>   
  );
}

export default TripSummary;

const styles = StyleSheet.create({
  overview: {
    margin: 15
  },
  subtext: {
    fontSize: 20
  },
  info: {
    fontSize: 40,
    paddingTop: 25
  },
  listItem: {
    backgroundColor: 'lightgrey',
    display: 'flex'
  },
  title: {
    paddingLeft: 10,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10
  }
});