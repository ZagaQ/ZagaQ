import React from 'react';
import { Text, View } from 'native-base';
import AddBookButton from './parts/AddBookButton';

const LibraryScreen = () => {
  return (
    <View flex={1}>
      <Text>ライブラリ</Text>
      <AddBookButton />
    </View>
  );
};

export default LibraryScreen;
