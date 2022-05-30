import React from 'react';
import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Select,
  Text,
  TextArea,
} from 'native-base';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import updateSection from '../../../../../script/updateSection';
import SectionType from '../../../../../script/type/SectionType';
import {sectionTypeObject} from '../../../../../script/type/SectionType';

type Props = NativeStackScreenProps<LibraryStackParamList, 'UpdateSection'>

/**
 * 問題集情報の更新画面
 */
const UpdateSectionScreen: React.VFC<Props> = ({navigation, route}) => {
  const [title, setTitle] = React.useState(route.params.section.title);
  const [titleError, setTitleError] = React.useState('');
  const [type, setType] = React.useState(route.params.section.type);
  const [description, setDescription] = React.useState(route.params.section.description);
  const [updateError, setCreateError] = React.useState('');

  const validateUpdateSectionForm = React.useCallback(() => {
    let ret = true;
    if (!title) {
      setTitleError('問題集のタイトルは必ず指定する必要があります');
      ret = false;
    }
    return ret;
  }, [title]);

  const pressUpdateSectionButton = React.useCallback(async () => {
    if (validateUpdateSectionForm()) {
      try {
        await updateSection(route.params.bookId, route.params.sectionId, {title, type, description});
      } catch (e) {
        if (e instanceof Error) {
          setCreateError(e.message);
        } else {
          setCreateError('未知のエラーにより、セクション情報の更新に失敗しました');
        }
      }
      navigation.navigate('Library');
    }
  }, [title, type, description]);

  return (
    <KeyboardAvoidingView h={{
      base: '100%',
      lg: 'auto',
    }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} flex={1} p={3}>
      <FormControl isRequired mb={3} isInvalid={titleError != ''}>
        <FormControl.Label>問題集タイトル</FormControl.Label>
        <Input onChangeText={setTitle} value={title} />
        <FormControl.ErrorMessage>{titleError}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired mb={3}>
        <FormControl.Label>問題区分</FormControl.Label>
        <Select
          selectedValue={type}
          minWidth="200"
          placeholder="選択してください"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }} mt={1} onValueChange={(itemValue) => {
            setType(itemValue as SectionType);
          }}>
          {
            Object.entries(sectionTypeObject).map((item) =>
              <Select.Item label={item[1]} value={item[0]} key={item[0]}/>,
            )
          }
        </Select>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>備考</FormControl.Label>
        <TextArea
          onChangeText={setDescription}
          value={description}
          height={20}
          autoCompleteType="off"
        />
      </FormControl>
      <Text px={1}>問題集のcsvファイルを差し替えることはできません。</Text>
      <Text px={1}>問題を全面的に差し替えたい場合、このセクションを削除して、新しいセクションを作成し直してください</Text>
      <FormControl isInvalid={updateError != ''}>
        <Button my={3} onPress={pressUpdateSectionButton}>
          更新する
        </Button>
        <FormControl.ErrorMessage>{updateError}</FormControl.ErrorMessage>
      </FormControl>
    </KeyboardAvoidingView>
  );
};

export default UpdateSectionScreen;
