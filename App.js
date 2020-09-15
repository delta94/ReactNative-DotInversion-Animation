import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.circleContainer}>
        <View style={[styles.circle]}>
          <TouchableOpacity style={styles.circle}>
            <View style={[styles.circle, styles.button]}>
              <AntDesign name="arrowright" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
