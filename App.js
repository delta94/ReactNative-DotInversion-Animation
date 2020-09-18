import React, {useState, useRef} from 'react';

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

import {colors, contents} from './contants';

const {width, height} = Dimensions.get('window');

const {Value, timing, parallel} = Animated;

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const App = () => {
  const [value, setValue] = useState(0);

  const animation = useRef(new Value(0)).current;
  const contentAnimation = useRef(new Value(0)).current;

  const {
    initialBgColor,
    circleColor,
    nextCircleColor,
    initialTextColor,
    nextTextColor,
  } = colors[value];

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
    outputRange: [initialBgColor, initialBgColor, circleColor, circleColor],
  });

  const circleBackgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 0.501, 0.9, 1],
    outputRange: [
      circleColor,
      circleColor,
      initialBgColor,
      initialBgColor,
      nextCircleColor,
    ],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.01, 0.9, 1],
    outputRange: [1, 0, 0, 1],
  });

  const textColor = animation.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: [
      initialTextColor,
      initialTextColor,
      nextTextColor,
      nextTextColor,
    ],
  });

  const translateContent = contentAnimation.interpolate({
    inputRange: [...Array(contents.length).keys()],
    outputRange: [width * 2, 0, -width * 2],
  });

  const buttonHandler = async () => {
    parallel([
      timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      timing(contentAnimation, {
        toValue: value + 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animation.setValue(0);
      if (value === colors.length - 1) {
        setValue(0);
        contentAnimation.setValue(0);
      } else setValue(value + 1);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.circleContainer, {backgroundColor}]}>
        <Animated.View style={styles.headContainer}>
          <Animated.Text style={[styles.headText, {color: textColor}]}>
            Storief{' '}
          </Animated.Text>
          <Animated.Text style={[styles.headText, {color: textColor}]}>
            Skip{' '}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{translateX: translateContent}],
            },
          ]}>
          {contents.map((element, index) => (
            <View style={[styles.textContainer]} key={index}>
              <View style={{width: width / 2}}>
                <Animated.Text style={[styles.text, {color: textColor}]}>
                  {element.title}
                </Animated.Text>
              </View>
            </View>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingBottom: 100,
  },
  headContainer: {
    width: width,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
  },
  contentContainer: {
    height: height / 2.4,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  textContainer: {
    width: width / 1.8,
    color: '#fff',
    width: width * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
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
