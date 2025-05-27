import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  ViewStyle,
  TextInputProps,
  Pressable,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {colors, images} from 'assets';
import {hScale, vScale} from 'utils/scaling';

type Props = {
  value: string;
  throttle?: number;
  onThrottledChange?: (term: string) => void;
  onTextChanges?: (term: string) => void;
  styleInput?: ViewStyle;
  styleContainer?: ViewStyle;
  showClearIcon?: boolean;
  showSearchIcon?: boolean;
  placeholder?: string;
  inputProps?: TextInputProps;
};

const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        func(...args);
      }, wait);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        func(...args);
      }, wait);
    }
  };
};

export const ThrottledSearchInput: FC<Props> = props => {
  const {width} = useWindowDimensions();

  const throttled = useRef(
    props.onThrottledChange
      ? throttle(
          (term: string) => props.onThrottledChange(term),
          props.throttle || 300,
        )
      : null,
  );

  const [value, setValue] = useState<string>(props.value);

  useEffect(() => {
    console.log('Value', value);
    throttled.current && throttled.current(value);
  }, [value]);

  const handleInput = useCallback(
    (input: string) => {
      console.log('Input', input);
      props.onTextChanges && props.onTextChanges(input);
      setValue(input);
    },
    [props],
  );

  const renderSearchIcon = () => {
    if (!props.showSearchIcon && !props.showClearIcon) {
      return null;
    }

    return (
      <Pressable
        onPress={() => {
          setValue('');
        }}
        style={styles.searchIconContainer}>
        {props.showSearchIcon && value === '' ? (
          <View />
        ) : (
          <Image style={styles.iconClear} source={images.icon_clear} />
        )}
      </Pressable>
    );
  };

  return (
    <View
      style={[
        {
          width: width - 40,
        },
        styles.container,
        props.styleContainer,
      ]}>
      <Image style={styles.iconSearch} source={images.icon_search} />
      <TextInput
        style={[styles.textInput, props.styleInput]}
        placeholder={props.placeholder}
        placeholderTextColor={colors.grey_1}
        onChangeText={handleInput}
        {...props.inputProps}
        value={value}
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
      {renderSearchIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  iconClear: {
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
  iconSearch: {
    height: 16,
    left: 15,
    position: 'absolute',
    width: 16,
  },
  searchIconContainer: {
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: hScale(12),
    position: 'absolute',
    right: 0,
    top: vScale(0),
  },
  textInput: {
    color: colors.black,
    fontSize: 15,
    paddingLeft: 36,
    paddingRight: 36,
    width: '100%',
  },
});
