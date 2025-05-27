import {FC, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ListRenderItemInfo,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Race} from 'api/types';
import {colors} from 'assets';
import useRaceListController from 'AuthLayer/RacesList/controller';
import {Text} from 'common/components';

type Props = {};
const RacesList: FC<Props> = () => {
  const {loadingMore, loading, racesList, onEndReached} =
    useRaceListController();

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  }, [loadingMore]);

  const renderRace = useCallback((info: ListRenderItemInfo<Race>) => {
    return (
      <View style={styles.raceContainer}>
        <Text
          font={'SF34'}
          color={'black'}>{`Season: ${info.item.season}`}</Text>
        <Text
          font={'SF24'}
          color={'black'}>{`Race: ${info.item.raceName}`}</Text>
        <Text font={'SF13'} color={'black'}>{`Round: ${info.item.round}`}</Text>
        <Pressable
          style={styles.urlPressable}
          onPress={() => Linking.openURL(info.item.url)}>
          <Text color={'blue'} style={styles.urlText} font={'SF13'}>
            {info.item.url}
          </Text>
        </Pressable>

        <Pressable
          style={styles.urlPressable}
          onPress={() => {
            const scheme = Platform.select({
              ios: 'maps:0,0?q=',
              android: 'geo:0,0?q=',
            });
            const latLng = `${info.item.Circuit.Location.lat}, ${info.item.Circuit.Location.long}`;
            const label = info.item.raceName;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`,
              web: '',
              macos: '',
              native: '',
              windows: '',
            });

            Linking.openURL(url);
          }}>
          <Text color={'blue'} style={styles.urlText} font={'SF13'}>
            {`${info.item.Circuit.Location.lat}, ${info.item.Circuit.Location.long}`}
          </Text>
        </Pressable>
        <Text style={styles.resultsText} color={'black'} font={'SF24'}>
          {'Results:'}
        </Text>
        {info.item.Results.map((it, index) => (
          <View key={index}>
            <Text
              font={'SF13'}
              color={
                'black'
              }>{`Position: ${it.position} ${it.positionText}`}</Text>
            <Text font={'SF13'} color={'black'}>{`Status: ${it.status}`}</Text>
            <Text font={'SF13'} color={'black'}>{`Grid: ${it.grid}`}</Text>
            <Text font={'SF13'} color={'black'}>{`Laps: ${it.laps}`}</Text>
            <Text font={'SF13'} color={'black'}>{`Points: ${it.points}`}</Text>
          </View>
        ))}
      </View>
    );
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={racesList}
      renderItem={renderRace}
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
    />
  );
};

export default RacesList;

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  raceContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 5,
    margin: 12,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  resultsText: {
    marginVertical: 16,
  },
  urlPressable: {
    marginTop: 8,
  },
  urlText: {
    textDecorationLine: 'underline',
  },
});
