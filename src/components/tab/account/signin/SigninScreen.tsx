import React from 'react';
import {Platform} from 'react-native';
import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  Link,
  VStack,
} from 'native-base';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../../config/firebase';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../AccountStack';

type Props = NativeStackScreenProps<AccountStackParamList, 'Signin'>

/**
 * ログインを行う画面
 */
const SigninScreen: React.VFC<Props> = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignin = React.useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [email, password]);

  const navigateRegisterScreen = React.useCallback(() => {
    navigation.navigate('Register');
  }, []);

  return (
    <KeyboardAvoidingView h={{
      base: '400px',
      lg: 'auto',
    }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex={1} px={3}>
        <VStack flex={1} justifyContent="flex-end" w="100%">
          <Heading mb={3}>
            ログイン
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
            <Input type="password" onChangeText={setPassword} value={password}/>
            <FormControl.HelperText mb={3}>
              最低6文字である必要があります。
            </FormControl.HelperText>
          </FormControl>
          <Button onPress={handleSignin} mb={3}>
            ログイン
          </Button>
          <Center>
            <Link onPress={navigateRegisterScreen}>
              アカウント登録はこちら
            </Link>
          </Center>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;