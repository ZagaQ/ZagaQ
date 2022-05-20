import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  HStack,
  Icon,
  Spacer,
  VStack,
  Button,
  Pressable,
  Center,
  useDisclose,
  Actionsheet,
} from 'native-base';
import AddBookButton from './parts/AddBookButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import readBook from '../../../../../script/readBook';
import Book from '../../../../../script/class/Book';
import {Ionicons} from '@expo/vector-icons';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

const HomeScreen = ({navigation} :Props) => {
  const [books, setBooks] = useState<{[id: string]: Book}>({});
  const {isOpen, onOpen, onClose} = useDisclose();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookData();
    });
    console.log(books);

    return unsubscribe;
  }, [navigation]);


  const pressAddBookButton = () => {
    navigation.navigate('CreateBook');
  };

  const getBookData = async () => {
    setBooks(await readBook());
  };

  return (
    <View flex={1}>
      <FlatList
        data={Object.entries(books).map(([key, value]) => ({key, value}))}
        renderItem={({item}) =>
          <Pressable>
            <HStack
              backgroundColor='amber.100'
              borderBottomWidth={1} borderBottomColor='gray.400'
              p={1}
            >
              <Center>
                <Text fontSize='lg' bold m={1}>{item.value.title}</Text>
              </Center>
              <Spacer />
              <VStack>
                <Button variant='ghost' colorScheme='gray' onPress={onOpen}>
                  <Icon
                    as={Ionicons}
                    name='ellipsis-vertical'
                    size={5}
                    color='black'
                  />
                </Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Actionsheet.Item>セクションの追加</Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>
              </VStack>
            </HStack>
          </Pressable>
        } />
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default HomeScreen;
