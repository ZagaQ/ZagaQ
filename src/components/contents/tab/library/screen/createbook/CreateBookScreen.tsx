import { Center, FormControl, Heading, Input, KeyboardAvoidingView } from "native-base"
import { Platform } from 'react-native';
import React, { useState } from 'react';

const CreateBookScreen = () => {
  const [title, setTitle] = useState('');

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
          <Input onChangeText={setTitle} value={title}/>
          <FormControl.HelperText mb={3}>
            なんか書いとけ
          </FormControl.HelperText>
        </FormControl>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default CreateBookScreen;
