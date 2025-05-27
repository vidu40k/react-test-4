import {FC, useCallback} from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Driver} from 'api/types';
import {useAppSelector} from 'appRedux';
import {colors} from 'assets';
import {Text} from 'common/components';
import dayjs from 'dayjs';
import {AuthStackParamList} from 'navigation/AuthNavigator';

type Props = {};
const DriverDetail: FC<Props> = () => {
  const route = useRoute<RouteProp<AuthStackParamList>>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const driverList = useAppSelector(state => state.data.drivers);
  const driver: Driver =
    driverList.filter(it => it.driverId === route.params.id).length > 0
      ? driverList.filter(it => it.driverId === route.params.id)[0]
      : {
          url: '',
          driverId: '',
          nationality: '',
          givenName: '',
          familyName: '',
          dateOfBirth: '',
          code: '',
        };
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `${driver.familyName} ${driver.givenName}`,
      });
    }, [driver.familyName, driver.givenName, navigation]),
  );

  return (
    <View style={styles.driverContainer}>
      <Text color={'black'} font={'SF24'}>
        {`${driver.familyName} ${driver.givenName}`}
      </Text>
      <Text style={styles.nationalText} font={'SF17'} color={'grey_2'}>
        {driver.nationality}
      </Text>
      <Text font={'SF13'} color={'black'}>
        {dayjs(driver.dateOfBirth).format('D MMMM YYYY')}
      </Text>
      <Pressable
        style={styles.urlPressable}
        onPress={() => Linking.openURL(driver.url)}>
        <Text color={'blue'} style={styles.urlText} font={'SF13'}>
          {driver.url}
        </Text>
      </Pressable>
    </View>
  );
};

export default DriverDetail;

const styles = StyleSheet.create({
  driverContainer: {
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
  nationalText: {
    marginTop: 8,
  },
  urlPressable: {
    marginVertical: 8,
  },
  urlText: {
    textDecorationLine: 'underline',
  },
});
