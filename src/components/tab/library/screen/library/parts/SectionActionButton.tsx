import React from 'react';
import {View, Button, Icon, Actionsheet, useDisclose} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {LibraryStackParamList} from '../../../LibraryTab';
import Section from '../../../../../../script/class/Section';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import DeleteSectionModal from './DeleteSectionModal';

type SectionActionButtonProps = {
  item: {
    bookId: string,
    id: string,
    value: Section,
  }
  reload: () => Promise<void>
}

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

/**
 * 問題集一覧におけるセクションに対する操作を行うボタンとアクションシート
 */
const SectionActionButton: React.VFC<SectionActionButtonProps> = (
    {item, reload},
) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation<NavigationProps>();

  const onPressUpdateBookButton = React.useCallback(() => {
  }, [item]);

  return (
    <View>
      <Button variant="ghost" colorScheme="gray" onPress={onOpen}>
        <Icon as={Ionicons} name="ellipsis-vertical" size={4} color="black" />
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={onPressUpdateBookButton}
          >
            情報の編集
          </Actionsheet.Item>
          <DeleteSectionModal item={item} reload={reload} />
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default SectionActionButton;
