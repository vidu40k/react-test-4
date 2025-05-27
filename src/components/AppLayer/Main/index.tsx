import {FC} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useMainController from 'AppLayer/Main/controller';
import {Button, ThrottledSearchInput} from 'common/components';
import {AppStackParamList} from 'navigation/AppNavigator';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Main'>;
  route: RouteProp<AppStackParamList, 'Main'>;
};

const Main: FC<Props> = () => {
  const {token, searchTerm, setSearchTerm, onPressButton, onPressNext} =
    useMainController();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Text>{'Main Screen'}</Text>
      <ThrottledSearchInput
        value={searchTerm}
        onThrottledChange={setSearchTerm}
      />
      <Text>{'searchTerm: ' + searchTerm}</Text>
      <Text>{'token: ' + token}</Text>
      <Button
        text={'Clear Token'}
        onPress={onPressButton}
        style={styles.button}
      />
      <Button text={'Go Next'} onPress={onPressNext} style={styles.button} />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  button: {width: '100%'},
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
});
