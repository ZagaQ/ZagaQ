import React from 'react';
import { View, } from 'native-base';
import AddBookButton from './parts/AddBookButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../../LibraryTab';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

const HomeScreen = ({ navigation } :Props) => {
  const pressAddBookButton = () => {
    navigation.navigate("CreateBook");
  }

  return (
    <View flex={1}>
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default HomeScreen;
