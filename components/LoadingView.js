import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingView = () => {
  return (
    <View style={{ height: '100%' }}>
      <ActivityIndicator animating />
    </View>
  );
}

export default LoadingView;