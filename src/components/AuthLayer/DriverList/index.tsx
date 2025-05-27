import {FC, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Driver} from 'api/types';
import {colors} from 'assets';
import useAuthController from 'AuthLayer/DriverList/controller';
import {Button, Text} from 'common/components';
import dayjs from 'dayjs';

type Props = {};
const DriverList: FC<Props> = () => {
  const {
    loading,
    driverList,
    loadingMore,
    onEndReached,
    onDriverPressed,
    onDriverRacesPressed,
  } = useAuthController();

  const renderDriver = useCallback(
    (info: ListRenderItemInfo<Driver>) => {
      return (
        <View style={styles.driverContainer}>
          <TouchableOpacity
            onPress={() => onDriverPressed(info.item.driverId)}
            style={styles.driverTouchable}>
            <Text color={'black'} font={'SF24'}>
              {`${info.item.familyName} ${info.item.givenName}`}
            </Text>
            <Text style={styles.nationalText} font={'SF17'} color={'grey_2'}>
              {info.item.nationality}
            </Text>
            <Text font={'SF13'} color={'black'}>
              {dayjs(info.item.dateOfBirth).format('D MMMM YYYY')}
            </Text>
            <Pressable
              style={styles.urlPressable}
              onPress={() => Linking.openURL(info.item.url)}>
              <Text color={'blue'} style={styles.urlText} font={'SF13'}>
                {info.item.url}
              </Text>
            </Pressable>
            <Button
              text={'Races'}
              onPress={() =>
                onDriverRacesPressed(
                  info.item.driverId,
                  `${info.item.familyName} ${info.item.givenName}`,
                )
              }
            />
          </TouchableOpacity>
        </View>
      );
    },
    [onDriverPressed, onDriverRacesPressed],
  );

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  }, [loadingMore]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={driverList}
      renderItem={renderDriver}
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
    />
  );
};

export default DriverList;

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  driverContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 5,
    margin: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  driverTouchable: {
    padding: 12,
    width: '100%',
  },
  nationalText: {
    marginTop: 8,
  },
  urlPressable: {
    marginBottom: 16,
    marginTop: 8,
  },
  urlText: {
    textDecorationLine: 'underline',
  },
});
