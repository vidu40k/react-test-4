import {FC, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from 'assets';
import Animated, {EasingNode} from 'react-native-reanimated';

type SwitchProps = {
  value: boolean;
  onChange: () => void;
  containerStyle?: ViewStyle;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Switch: FC<SwitchProps> = ({value, onChange, containerStyle}) => {
  const animate = useRef(new Animated.Value(value ? 1 : 0)).current;
  const isFirst = useRef(true);

  const animatedValue = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });
  const color = Animated.interpolateColors(animate, {
    inputRange: [0, 1],
    outputColorRange: ['rgba(120, 120, 128, 0.16)', '#34C759'],
  }) as any;

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      Animated.timing(animate, {
        toValue: value ? 1 : 0,
        duration: 300,
        easing: EasingNode.ease,
      }).start();
    }
  }, [value, animate]);

  return (
    <AnimatedTouchableOpacity
      onPress={onChange}
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: color,
        },
      ]}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{translateX: animatedValue}],
          },
        ]}
      />
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 30,
    marginLeft: 20,
    padding: 2,
    width: 50,
  },
  dot: {
    backgroundColor: colors.white,
    borderRadius: 13,
    height: 26,
    width: 26,
  },
});
