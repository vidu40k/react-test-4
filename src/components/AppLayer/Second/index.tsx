import {FC} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useSecondController from 'AppLayer/Second/controller';
import {Button} from 'common/components';
import {AppStackParamList} from 'navigation/AppNavigator';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Second'>;
  route: RouteProp<AppStackParamList, 'Second'>;
};

const Second: FC<Props> = () => {
  const {params, onPressButton} = useSecondController();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Text>{'Second Screen'}</Text>
      <Text>{`Passed params : {${JSON.stringify(params)}}`}</Text>
      <Button text={'Go back'} onPress={onPressButton} style={styles.button} />
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({
  button: {width: '100%'},
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
});
