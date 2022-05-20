import React from 'react';
import {View, Text, Button} from 'native-base';
import {signOut} from 'firebase/auth';
import {auth} from '../../../../../config/firebase';

const HomeScreen: React.VFC = () => {
  const handleLogout = React.useCallback(() => {
    signOut(auth);
  }, [auth]);

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
