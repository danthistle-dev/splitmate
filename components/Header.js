import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const Header = ({ title, back, nav, edit }) => {
  let [fontsLoaded] = useFonts({
    'Lobster-Two-Regular': require('../assets/fonts/LobsterTwo-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return(
      <Appbar.Header style={styles.header}>
        {back ? <Appbar.BackAction color="white" onPress={() => nav.goBack()} /> : null}
        <Appbar.Content 
          title={title}
          titleStyle={styles.title}
        />
        {edit ? <Appbar.Action color="white" icon="circle-edit-outline" onPress={() => nav.navigate('Edit Trip', edit)} /> : null}
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70
  },
  title: {
    fontFamily: "Lobster-Two-Regular",
    fontSize: 40,
    color: 'white'
  },
});

export default Header;