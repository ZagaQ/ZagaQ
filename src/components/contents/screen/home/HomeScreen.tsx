import React from 'react';
import { View, Text, Button } from "native-base";
import { signOut } from 'firebase/auth';
import { auth } from '../../../../config/firebase';

const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
      })
      .catch((error: Error) => {
        console.log(error.message);
      })
  }

  return (
    <View>
      <Text>ホーム画面</Text>
      <Button onPress={handleLogout} >
        ログアウト
      </Button>
    </View>
  );
};

export default HomeScreen;
