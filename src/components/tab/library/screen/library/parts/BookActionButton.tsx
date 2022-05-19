import { View, Button, Icon, Actionsheet, useDisclose } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Book from '../../../../../../script/class/Book';
import DeleteBookModal from './DeleteBookModal';

type BookActionButtonProps = {
  item: {
    key: string,
    value: Book,
  }
  reload: () => Promise<void>
}

const BookActionButton = (props: BookActionButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View>
      <Button variant="ghost" colorScheme="gray" onPress={onOpen}>
        <Icon as={Ionicons} name="ellipsis-vertical" size={5} color="black" />
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>セクションの追加</Actionsheet.Item>
          <Actionsheet.Item>情報の編集</Actionsheet.Item>
          <DeleteBookModal item={props.item} reload={() => props.reload()}/>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}

export default BookActionButton;
