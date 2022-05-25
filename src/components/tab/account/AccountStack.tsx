import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from './signin/SigninScreen';
import RegisterScreen from './register/RegisterScreen';

const Stack = createNativeStackNavigator();

export type AccountStackParamList = {
  'Signin': undefined;
  'Register': undefined;
}

/**
 * アカウント関係の画面をまとめたStack
 */
const AccountStack: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AccountStack;
