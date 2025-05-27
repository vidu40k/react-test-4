import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Main from 'AppLayer/Main';
import Second from 'AppLayer/Second';

export type AppStackParamList = {
  Main: undefined;
  Second: {text: string};
};

const Stack = createStackNavigator<AppStackParamList>();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
const AppNavigator = () => (
  <>
    <Stack.Screen name={'Main'} component={Main} options={{title: 'Main'}} />
    <Stack.Screen
      name={'Second'}
      component={Second}
      options={{title: 'Second'}}
    />
  </>
);
export default AppNavigator;
