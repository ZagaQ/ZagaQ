import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StatisticsScreen from './screen/StatisticsScreen';


export type StatisticsStackParamList = {
  Statistics: undefined;
}

const Stack = createNativeStackNavigator<StatisticsStackParamList>();

/**
 * 統計関係の画面をまとめるタブ
 */
const StatisticsTab: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Statistics' component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

export default StatisticsTab;
