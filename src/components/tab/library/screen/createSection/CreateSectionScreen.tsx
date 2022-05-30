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
import * as DocumentPicker from 'expo-document-picker';
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
  const [fileMassage, setFileMassage] = React.useState('ファイルが選択されていません');
  const [fileUri, setFileUri] = React.useState('');
  const [fileError, setFileError] = React.useState('');
  const [createError, setCreateError] = React.useState('');

  const validationCreateSectionForm = React.useCallback(() => {
    let ret = true;
    if (!title) {
      setTitleError('セクション名は必ず指定する必要があります');
      ret = false;
    } else {
      setTitleError('');
    }
    if (!fileUri) {
      setFileError('問題のファイルは必ず指定する必要があります');
      ret = false;
    } else if (!fileMassage.endsWith('.csv') && !fileMassage.endsWith('.CSV')) {
      setFileError('問題はCSV形式である必要があります');
      ret = false;
    } else {
      setFileError('');
    }
    return ret;
  }, [title, fileUri, fileMassage]);

  const pressCreateSectionButton = React.useCallback(async () => {
    if (validationCreateSectionForm()) {
      try {
        await createSection(
            route.params.id,
            {title, type, description},
            fileUri,
        );
      } catch (e) {
        if (e instanceof Error) {
          setCreateError(e.message);
        } else {
          setCreateError('未知のエラーにより、セクションの追加に失敗しました');
        }
      }
      navigation.navigate('Library');
    }
  }, [route.params.id, title, type, description, validationCreateSectionForm]);

  const pressAddSectionFileButton = React.useCallback(async () => {
    const selectedFile = await DocumentPicker.getDocumentAsync({
      'type': '*/*',
    });
    if (selectedFile.type != 'cancel') {
      setFileMassage(selectedFile.name);
      setFileUri(selectedFile.uri);
    } else {
      setFileMassage('ファイルが選択されていません');
      setFileUri('');
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} p={3}
    >
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
      <FormControl isRequired mb={3} isInvalid={fileError != ''}>
        <FormControl.Label>問題データ</FormControl.Label>
        <Text>{fileMassage}</Text>
        <Button onPress={pressAddSectionFileButton}>
            問題ファイルを選択する
        </Button>
        <FormControl.ErrorMessage>{fileError}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={createError != ''}>
        <Button margin={3} onPress={pressCreateSectionButton}>
            追加する
        </Button>
        <FormControl.ErrorMessage>{createError}</FormControl.ErrorMessage>
      </FormControl>
    </KeyboardAvoidingView>
  );
};

export default CreateSectionScreen;
