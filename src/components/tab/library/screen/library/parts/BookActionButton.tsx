import React, {useCallback} from 'react';
import {View, Button, Icon, Actionsheet, useDisclose} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Book from '../../../../../../script/class/Book';
import DeleteBookModal from './DeleteBookModal';
import {useNavigation} from '@react-navigation/native';
import {LibraryStackParamList} from '../../../LibraryTab';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack/lib/typescript/src/types';

type BookActionButtonProps = {
  item: {
    key: string,
    value: Book,
  }
  reload: () => Promise<void>
}

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

const BookActionButton = (props: BookActionButtonProps) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation<NavigationProps>();

  const onPressUpdateBookButton = useCallback(() => {
    navigation.navigate(
        'UpdateBook',
        {id: props.item.key, book: props.item.value},
    );
  }, [props]);

  return (
    <View>
      <Button variant="ghost" colorScheme="gray" onPress={onOpen}>
        <Icon as={Ionicons} name="ellipsis-vertical" size={5} color="black" />
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>セクションの追加</Actionsheet.Item>
          <Actionsheet.Item
            onPress={onPressUpdateBookButton}
          >
            情報の編集
          </Actionsheet.Item>
          <DeleteBookModal item={props.item} reload={props.reload}/>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default BookActionButton;
