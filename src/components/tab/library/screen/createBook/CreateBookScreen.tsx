import React from 'react';
import {
  Button,
  Center,
  FormControl,
  Input,
  KeyboardAvoidingView,
  TextArea,
} from 'native-base';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import createBook from '../../../../../script/createBook';

type Props = NativeStackScreenProps<LibraryStackParamList, 'CreateBook'>

const CreateBookScreen: React.VFC<Props> = ({navigation}) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [createError, setCreateError] = React.useState('');

  const validationCreateBookForm = React.useCallback(() => {
    let ret = true;
    if (!title) {
      setTitleError('問題集のタイトルは必ず指定する必要があります');
      ret = false;
    }
    return ret;
  }, [title]);

  const pressCreateBookButton = React.useCallback(async () => {
    if (validationCreateBookForm()) {
      try {
        await createBook({title, author, description});
      } catch (e) {
        if (e instanceof Error) {
          setCreateError(e.message);
        } else {
          setCreateError('未知のエラーにより、問題集の追加に失敗しました');
        }
      }
      navigation.navigate('Library');
    }
  }, [title, author, description]);

  return (
    <KeyboardAvoidingView h={{
      base: '400px',
      lg: 'auto',
    }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex={1} px={3}>
        <FormControl isRequired mb={3} isInvalid={titleError != ''}>
          <FormControl.Label>問題集タイトル</FormControl.Label>
          <Input onChangeText={setTitle} value={title} />
          <FormControl.ErrorMessage>{titleError}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={3}>
          <FormControl.Label>発行者</FormControl.Label>
          <Input onChangeText={setAuthor} value={author} />
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
          <Button margin={3} onPress={pressCreateBookButton}>
            追加する
          </Button>
          <FormControl.ErrorMessage>{createError}</FormControl.ErrorMessage>
        </FormControl>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default CreateBookScreen;
