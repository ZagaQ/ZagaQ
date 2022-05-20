import React from 'react';
import {Center, Text, View} from 'native-base';

const LoadingScreen = () => {
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
