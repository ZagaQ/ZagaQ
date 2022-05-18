import React, { useState } from 'react';
import { ScrollView, View, Heading, FlatList, Box, Text } from 'native-base';
import AddBookButton from './parts/AddBookButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../../LibraryTab';
import readBook from '../../../../../script/readBook';
import Book from '../../../../../script/class/Book';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

const HomeScreen = ({ navigation } :Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookData();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const pressAddBookButton = () => {
    navigation.navigate("CreateBook");
  }

  const getBookData = async () => {
    setBooks(await readBook());
  }

  return (
    <View flex={1}>
      <FlatList data={books} renderItem={({item}) => 
        <Box>
          <Text>{item.title}</Text>
        </Box>
      }>
      </FlatList>
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default HomeScreen;
