import {useCallback, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {unwrapResult} from '@reduxjs/toolkit';
import {useAppDispatch, useAppSelector} from 'appRedux';
import {reset} from 'appRedux/thunks';
import {AppStackParamList} from 'navigation/AppNavigator';

const useMainController = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, 'Main'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'Main'>>();

  const token = useAppSelector(state => state.data.token);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onPressButton = useCallback(
    () => dispatch(reset()).then(unwrapResult),
    [dispatch],
  );

  const onPressNext = useCallback(
    () => navigation.navigate('Second', {text: searchTerm}),
    [navigation, searchTerm],
  );

  return {token, searchTerm, setSearchTerm, onPressButton, onPressNext};
};

export default useMainController;
