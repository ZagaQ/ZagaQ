import React, { useState } from "react";
import { Platform } from 'react-native';
import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  Link,
  VStack,
} from "native-base"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const RegisterScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView h={{
      base: "400px",
      lg: "auto"
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Center flex={1} px={3}>
        <VStack flex={1} justifyContent="flex-end" w="100%">
          <Heading mb={3}>
            アカウント登録
          </Heading>
          <FormControl isRequired>
            <FormControl.Label>メールアドレス</FormControl.Label>
            <Input onChangeText={setEmail} value={email}/>
            <FormControl.HelperText mb={3}>
              有効なメールアドレスを記入してください。
            </FormControl.HelperText>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>パスワード</FormControl.Label>
            <Input type="password" onChangeText={setPassword} vaule={password}/>
            <FormControl.HelperText mb={3}>
              最低6文字である必要があります。
            </FormControl.HelperText>
          </FormControl>
          <Button onPress={handleRegister} mb={3}>
            登録
          </Button>
          <Center>
            <Link onPress={() => props.navigation.navigate('Signin')}>
              ログインはこちら
            </Link>
          </Center>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;
