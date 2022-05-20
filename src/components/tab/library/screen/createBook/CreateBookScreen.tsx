import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  TextArea,
} from 'native-base';
import {Platform} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import createBook from '../../../../../script/createBook';

type Props = NativeStackScreenProps<LibraryStackParamList, 'CreateBook'>

const CreateBookScreen = ({navigation}: Props) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [createError, setCreateError] = useState('');

  const pressCreateBookButton = async () => {
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
  };

  const validationCreateBookForm = () => {
    let ret = true;
    if (!title) {
      setTitleError('問題集のタイトルは必ず指定する必要があります');
      ret = false;
    }
    return ret;
  };

  return (
    <KeyboardAvoidingView h={{
      base: '400px',
      lg: 'auto',
    }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex={1} px={3}>
        <Heading mb={3}>
          問題集の追加
        </Heading>
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
