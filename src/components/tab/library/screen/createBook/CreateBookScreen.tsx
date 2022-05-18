import { Button, Center, FormControl, Heading, Input, KeyboardAvoidingView, TextArea } from "native-base"
import { Platform } from 'react-native';
import React, { useState } from 'react';
import { auth, store } from "../../../../../config/firebase";
import { addDoc, collection, doc, getDoc, runTransaction, setDoc, Transaction } from "firebase/firestore";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../../LibraryTab';

type Props = NativeStackScreenProps<LibraryStackParamList, "CreateBook">

const CreateBookScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('')
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [createError, setCreateError] = useState('');

  const PressCreateBookButton = async () => {
    if(ValidationCreateBookForm()) {
      await CreateBook();
    }
  }

  const ValidationCreateBookForm = () => {
    let ret = true;
    if(!title) {
      setTitleError("問題集のタイトルは必ず指定する必要があります");
      ret = false;
    }
    return ret;
  }

  const CreateBook = async () => {
    try {
      if(typeof(auth.currentUser?.uid) == "string") {
        const uid = auth.currentUser?.uid;
        addDoc(collection(store, "users", uid, "books"), {
          title: title,
          author: author,
          description: description,
        });
        navigation.navigate("Library");
      } else {
        throw Error("ログインしていません。アプリケーションを再起動してログインしてください。")
      }
    } catch(e) {
      if (e instanceof Error) {
        setCreateError(e.message);
      }
      setCreateError("未知の理由により問題集の追加に失敗しました。");
    }
  }

  return (
    <KeyboardAvoidingView h={{
      base: "400px",
      lg: "auto"
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Center flex={1} px={3}>
        <Heading mb={3}>
          問題集の追加
        </Heading>
        <FormControl isRequired mb={3} isInvalid={titleError != ""}>
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
          <TextArea onChangeText={setDescription} value={description} height={20} autoCompleteType="off" />
        </FormControl>
        <FormControl isInvalid={createError != ""}>
          <Button margin={3} onPress={PressCreateBookButton}>
            追加する
          </Button>
          <FormControl.ErrorMessage>{createError}</FormControl.ErrorMessage>
        </FormControl>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default CreateBookScreen;
