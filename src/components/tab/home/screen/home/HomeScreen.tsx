import React from 'react';
import { View, Text, Button, Icon, HStack, CheckIcon } from 'native-base';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../../../config/firebase';
import { Ionicons } from "@expo/vector-icons";

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
      <HStack space={2}>
      <HStack space={3}>
        <Icon as={Ionicons} name="home" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} />
      </HStack>
      </HStack>
    </View>
  );
};

export default HomeScreen;
