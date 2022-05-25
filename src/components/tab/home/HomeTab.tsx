import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/home/HomeScreen';


export type HomeStackParamList = {
  Home: undefined;
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * ホーム関係の画面をまとめるタブ
 */
const HomeTab: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeTab;
