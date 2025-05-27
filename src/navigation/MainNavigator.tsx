import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {RootState, useAppSelector} from '../redux';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const token = useAppSelector((state: RootState) => state.data.token);
  console.log('token', token);
  return (
    <Stack.Navigator>
      {!token || token === '' ? AuthNavigator() : AppNavigator()}
    </Stack.Navigator>
  );
};

export default MainNavigator;
