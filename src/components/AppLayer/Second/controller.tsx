import {useCallback} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from 'navigation/AppNavigator';

const useSecondController = () => {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'Second'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'Second'>>();

  const onPressButton = useCallback(() => navigation.goBack(), [navigation]);

  return {params: route.params, onPressButton};
};

export default useSecondController;
