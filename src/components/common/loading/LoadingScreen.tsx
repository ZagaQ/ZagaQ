import React from 'react';
import {Center, Text, View} from 'native-base';

/**
 * 読み込み中であることを表示する画面
 */
const LoadingScreen: React.VFC = () => {
  return (
    <View>
      <Center flex={1} px="3">
        <Text>
          Loading...
        </Text>
      </Center>
    </View>
  );
};

export default LoadingScreen;
