import React from 'react';
import {
  View,
  FlatList,
  Text,
  HStack,
  Spacer,
  VStack,
  Pressable,
  Center,
} from 'native-base';
import AddBookButton from './parts/AddBookButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import readBook from '../../../../../script/readBook';
import Book from '../../../../../script/class/Book';
import BookActionButton from './parts/BookActionButton';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

const LibraryScreen: React.VFC<Props> = ({navigation}) => {
  const [books, setBooks] = React.useState<{[id: string]: Book}>({});

  const getBookData = React.useCallback(async () => {
    setBooks(await readBook());
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookData();
    });
    return unsubscribe;
  }, [navigation]);


  const pressAddBookButton = React.useCallback(() => {
    navigation.navigate('CreateBook');
  }, []);

  return (
    <View flex={1}>
      <FlatList
        data={Object.entries(books).map(([key, value]) => ({key, value}))}
        renderItem={({item}) =>
          <Pressable>
            <HStack
              backgroundColor="amber.100"
              borderBottomWidth={1}
              borderBottomColor="gray.400"
              p={1}
            >
              <Center>
                <Text fontSize="lg" bold m={1}>{item.value.title}</Text>
              </Center>
              <Spacer />
              <VStack>
                <BookActionButton item={item} reload={getBookData}/>
              </VStack>
            </HStack>
          </Pressable>
        }
      />
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default LibraryScreen;
