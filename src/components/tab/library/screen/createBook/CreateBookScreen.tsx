import { Button, Center, FormControl, Heading, Input, KeyboardAvoidingView, TextArea } from "native-base"
import { Platform } from 'react-native';
import React, { useState } from 'react';

const CreateBookScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  return (
    <KeyboardAvoidingView h={{
      base: "400px",
      lg: "auto"
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Center flex={1} px={3}>
        <Heading mb={3}>
          問題集の追加
        </Heading>
        <FormControl isRequired>
          <FormControl.Label>問題集タイトル</FormControl.Label>
          <Input onChangeText={setTitle} value={title} />
        </FormControl>
        <FormControl>
          <FormControl.Label>発行者</FormControl.Label>
          <Input onChangeText={setAuthor} value={author} />
        </FormControl>
        <FormControl>
          <FormControl.Label>備考</FormControl.Label>
          <TextArea onChangeText={setDescription} value={description} height={20} autoCompleteType />
        </FormControl>
      </Center>
      <Button margin={3}>
        追加する
      </Button>
    </KeyboardAvoidingView>
  )
}

export default CreateBookScreen;
