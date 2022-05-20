import {Modal, Button, Text, Actionsheet} from 'native-base';
import React from 'react';
import Book from '../../../../../../script/class/Book';
import deleteBook from '../../../../../../script/deleteBook';

type DeleteBookModalProps = {
  item: {
    key: string,
    value: Book,
  }
  reload: () => Promise<void>
}

const DeleteBookModal: React.VFC<DeleteBookModalProps> = ({item, reload}) => {
  const [showModal, setShowModal] = React.useState(false);

  const onPressDeleteButton = React.useCallback(async () => {
    await deleteBook(item.key);
    await reload();
    setShowModal(false);
  }, [item, reload]);

  const onPressCancelButton = React.useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Actionsheet.Item borderTopWidth={1} onPress={() => setShowModal(true)}>
      削除
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>問題集の削除</Modal.Header>
          <Modal.Body>
            <Text>問題集「{item.value.title}」を削除しますか？</Text>
            <Text>この操作は取り消せません。</Text>
            <Text>また、この問題集内に作成されたセクションも削除されます。</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={onPressCancelButton}
              >
                キャンセル
              </Button>
              <Button
                backgroundColor="red.500"
                onPress={onPressDeleteButton}
              >
                削除
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Actionsheet.Item>
  );
};

export default DeleteBookModal;
