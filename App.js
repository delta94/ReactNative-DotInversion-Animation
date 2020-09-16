import React, {useRef} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  Text,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const {Value, timing} = Animated;

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const App = () => {
  const animation = useRef(new Value(0)).current;

  const rotateY = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-90deg', '-180deg'],
  });

  const iconRotateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [`0deg`, '180deg'],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 8, 1],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 50, 0],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: ['#F576AA', '#F576AA', '#000B92', '#000B92'],
  });

  const circleBackgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: ['#000B92', '#000B92', '#F576AA', '#F576AA'],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.01, 0.9, 1],
    outputRange: [1, 0, 0, 1],
  });

  const buttonHandler = () => {
    animation.setValue(0);

    timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.circleContainer, {backgroundColor}]}>
        <Animated.View style={[styles.contentContainer]}>
          <View style={[styles.textContainer]}>
            <Text style={styles.text}>Drag and drop to move</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: circleBackgroundColor,
              transform: [{perspective: 100}, {scale}, {rotateY}, {translateX}],
            },
          ]}>
          <TouchableOpacity style={styles.circle} onPress={buttonHandler}>
            <Animated.View
              style={[
                styles.circle,
                styles.button,
                {opacity, transform: [{rotateY: iconRotateY}]},
              ]}>
              <AnimatedAntDesign
                name="right"
                size={28}
                style={{color: backgroundColor}}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  contentContainer: {
    paddingBottom: 50,
    flexDirection: 'row',
  },
  textContainer: {
    width: width / 1.8,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  circle: {
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
