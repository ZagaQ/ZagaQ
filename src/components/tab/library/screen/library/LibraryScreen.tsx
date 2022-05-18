import React, { useState } from 'react';
import { ScrollView, View, } from 'native-base';
import AddBookButton from './parts/AddBookButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../../LibraryTab';
import { collection } from 'firebase/firestore';
import { store, auth } from '../../../../../config/firebase';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

const HomeScreen = ({ navigation } :Props) => {
  const [books, setBooks] = useState({});

  const pressAddBookButton = () => {
    navigation.navigate("CreateBook");
  }

  const getBookData = async () => {
    const ref = collection(store, "users", auth.currentUser?.uid!, "books")
  }

  return (
    <View flex={1}>
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default HomeScreen;
