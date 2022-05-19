import { View, Button, Icon, Actionsheet, useDisclose } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type BookActionButtonProps = {
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
          <Actionsheet.Item>情報の更新</Actionsheet.Item>
          <Actionsheet.Item borderTopWidth={1}>削除</Actionsheet.Item> 
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}

export default BookActionButton;
