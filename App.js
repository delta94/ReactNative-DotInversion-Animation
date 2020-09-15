import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.circleContainer}>
        <View style={styles.circle}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  circle: {
    backgroundColor: '#444',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default App;
