import {Modal, Button, Text, Actionsheet} from 'native-base';
import React from 'react';
import Section from '../../../../../../script/class/Section';
import deleteSection from '../../../../../../script/deleteSection';

type DeleteBookModalProps = {
  item: {
    bookId: string
    sectionId: string,
    section: Section,
  }
  reload: () => Promise<void>
}

/**
 * 問題集の削除の確認を行うモーダル
 */
const DeleteSectionModal: React.VFC<DeleteBookModalProps> = ({item, reload}) => {
  const [showModal, setShowModal] = React.useState(false);

  const onPressDeleteButton = React.useCallback(async () => {
    await deleteSection(item.bookId, item.sectionId);
    await reload();
    setShowModal(false);
  }, [item, reload]);

  const setShowModalTrue = React.useCallback(() => {
    setShowModal(true);
  }, []);

  const setShowModalFalse = React.useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Actionsheet.Item borderTopWidth={1} onPress={setShowModalTrue}>
      削除
      <Modal isOpen={showModal} onClose={setShowModalFalse}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>問題集の削除</Modal.Header>
          <Modal.Body>
            <Text>問題集「{item.section.title}」を削除しますか？</Text>
            <Text>この操作は取り消せません。</Text>
            <Text>また、この問題集内に作成されたセクションも削除されます。</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={setShowModalFalse}
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

export default DeleteSectionModal;
