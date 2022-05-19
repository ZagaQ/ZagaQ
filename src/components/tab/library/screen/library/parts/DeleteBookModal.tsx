import { Modal, Button, Text, Actionsheet } from 'native-base';
import React, { useState } from 'react';
import Book from '../../../../../../script/class/Book';
import deleteBook from '../../../../../../script/deleteBook';

type DeleteBookModalProps = {
  item: {
    key: string,
    value: Book,
  }
  reload: () => Promise<void>
}

const DeleteBookModal = (props: DeleteBookModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const onPressDeleteButton = async(id: string) => {
    await deleteBook(id);
    await props.reload();
    setShowModal(false);
  }

  return (
    <Actionsheet.Item borderTopWidth={1} onPress={() => setShowModal(true)}>
      削除
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>問題集の削除</Modal.Header>
          <Modal.Body>
            <Text>問題集「{props.item.value.title}」を削除しますか？</Text>
            <Text>この操作は取り消せません。</Text>
            <Text>また、この問題集内に作成されたセクションも削除されます。</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => { setShowModal(false); }}>
                キャンセル
              </Button>
              <Button backgroundColor="red.500" onPress={() => onPressDeleteButton(props.item.key)}>
                削除
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Actionsheet.Item>
  )
}

export default DeleteBookModal;