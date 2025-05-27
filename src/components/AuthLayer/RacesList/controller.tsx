import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {unwrapResult} from '@reduxjs/toolkit';
import {PAGE_SIZE} from 'api/requests';
import {Race} from 'api/types';
import {useAppDispatch, useAppSelector} from 'appRedux';
import {getRacesByDriver} from 'appRedux/thunks';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {AppError} from 'utils/handler';

const useRaceListController = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<AuthStackParamList, 'RaceList'>>();
  const racesList: Race[] = useAppSelector(state =>
    state.data.driversRaces[route.params.id]
      ? state.data.driversRaces[route.params.id]
      : [],
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [shouldRequestMore, setShouldRequestMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `RaceList (${route.params.name})`,
      });
    }, [route.params.name, navigation]),
  );
  useEffect(() => {
    setLoading(true);
    dispatch(getRacesByDriver({offset: 0, driver: route.params.id}))
      .then(unwrapResult)
      .then(_ => {})
      .catch((er: AppError) => {
        Alert.alert(er.name, er.message);
      })
      .finally(() => setLoading(false));
  }, [dispatch, route.params.id]);

  const onEndReached = useCallback(() => {
    if (loading || loadingMore || !shouldRequestMore) {
      return;
    }

    setLoadingMore(true);
    let newOffset = offset + PAGE_SIZE;
    dispatch(getRacesByDriver({offset: newOffset, driver: route.params.id}))
      .then(unwrapResult)
      .then(res => {
        setOffset(prevState => prevState + PAGE_SIZE);
        if (res.MRData.RaceTable.Races.length === 0) {
          setShouldRequestMore(false);
        }
      })
      .catch((er: AppError) => {
        Alert.alert(er.name, er.message);
      })
      .finally(() => setLoadingMore(false));
  }, [
    dispatch,
    loading,
    loadingMore,
    offset,
    route.params.id,
    shouldRequestMore,
  ]);

  return {loadingMore, loading, racesList, onEndReached};
};

export default useRaceListController;
