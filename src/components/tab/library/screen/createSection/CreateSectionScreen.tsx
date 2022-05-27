import React from 'react';
import {
  Button,
  Center,
  CheckIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Select,
  TextArea,
} from 'native-base';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import createSection from '../../../../../script/createSection';
import {sectionTypeObject} from '../../../../../script/type/SectionType';
import SectionType from '../../../../../script/type/SectionType';

type Props = NativeStackScreenProps<LibraryStackParamList, 'CreateSection'>

/**
 * 所持問題集の追加を行う画面
 */
const CreateSectionScreen: React.VFC<Props> = ({navigation, route}) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [type, setType] = React.useState<SectionType>('normal');
  const [description, setDescription] = React.useState('');
  const [createError, setCreateError] = React.useState('');

  const validationCreateSectionForm = React.useCallback(() => {
    let ret = true;
    if (!title) {
      setTitleError('セクション名は必ず指定する必要があります');
      ret = false;
    }
    return ret;
  }, [title]);

  const pressCreateSectionButton = React.useCallback(async () => {
    if (validationCreateSectionForm()) {
      try {
        await createSection(route.params.id, {title, type, description});
      } catch (e) {
        if (e instanceof Error) {
          setCreateError(e.message);
        } else {
          setCreateError('未知のエラーにより、セクションの追加に失敗しました');
        }
      }
      navigation.navigate('Library');
    }
  }, [route.params.id, title, type, description]);

  return (
    <KeyboardAvoidingView h={{
      base: '400px',
      lg: 'auto',
    }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex={1} px={3}>
        <FormControl isRequired mb={3} isInvalid={titleError != ''}>
          <FormControl.Label>セクション名</FormControl.Label>
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
        <FormControl isInvalid={createError != ''}>
          <Button margin={3} onPress={pressCreateSectionButton}>
            追加する
          </Button>
          <FormControl.ErrorMessage>{createError}</FormControl.ErrorMessage>
        </FormControl>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default CreateSectionScreen;
