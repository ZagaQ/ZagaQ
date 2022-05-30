import React from 'react';
import {
  View,
} from 'native-base';
import AddBookButton from './parts/AddBookButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LibraryStackParamList} from '../../LibraryTab';
import readBook, {ReadBookReturn} from '../../../../../script/readBook';
import LibraryList from './parts/LibraryList';


type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>

/**
 * 所持問題集一覧の画面
 */
const LibraryScreen: React.VFC<Props> = ({navigation}) => {
  const [books, setBooks] = React.useState<ReadBookReturn>({});
  const getBookData = React.useCallback(async () => {
    setBooks(await readBook());
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookData();
    });
    return unsubscribe;
  }, [navigation]);


  const pressAddBookButton = React.useCallback(() => {
    navigation.navigate('CreateBook');
  }, []);

  return (
    <View flex={1}>
      <LibraryList data={books} reload={getBookData} />
      <AddBookButton onPress={pressAddBookButton} />
    </View>
  );
};

export default LibraryScreen;
