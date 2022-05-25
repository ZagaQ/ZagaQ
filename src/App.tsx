import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import {Icon, NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/firebase';
import LoadingScreen from './components/common/loading/LoadingScreen';
import {Ionicons} from '@expo/vector-icons';
import {registerRootComponent} from 'expo';
import LibraryTab from './components/tab/library/LibraryTab';
import AccountStack from './components/tab/account/AccountStack';
import HomeTab from './components/tab/home/HomeTab';
import StatisticsTab from './components/tab/statistics/StatisticsTab';
import {AdMobBanner} from 'expo-ads-admob';

const Tab = createBottomTabNavigator();

/**
 * アプリケーションの本体
 */
export default function App(): JSX.Element {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user?.email) {
        setUser(user.email);
      } else {
        setUser('');
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <LoadingScreen />
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            {user ? (
              <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen
                  name="Home"
                  component={HomeTab}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <Icon
                        as={Ionicons}
                        name='home'
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Library"
                  component={LibraryTab}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <Icon
                        as={Ionicons}
                        name='library'
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Statistics"
                  component={StatisticsTab}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <Icon
                        as={Ionicons}
                        name='stats-chart'
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            ) : (
              <AccountStack />
            )}
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-8810091747981226/9905144091"
              servePersonalizedAds
            />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}

AppRegistry.registerComponent('ZagaQ', () => App);
registerRootComponent(App);
