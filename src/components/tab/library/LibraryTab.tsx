import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LibraryScreen from './screen/library/LibraryScreen';
import CreateBookScreen from './screen/createBook/CreateBookScreen';
import UpdateBookScreen from './screen/updateBook/UpdateBookScreen';
import CreateSectionScreen from './screen/createSection/CreateSectionScreen';
import Book from '../../../script/class/Book';

export type LibraryStackParamList = {
  Library: undefined;
  CreateBook: undefined;
  UpdateBook: {id: string, book: Book};
  CreateSection: {id: string};
}

const Stack = createNativeStackNavigator<LibraryStackParamList>();

/**
 * 所持問題集関係の画面をまとめるタブ
 */
const LibraryTab: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Library' component={LibraryScreen} />
      <Stack.Screen name='CreateBook' component={CreateBookScreen} />
      <Stack.Screen name='UpdateBook' component={UpdateBookScreen} />
      <Stack.Screen name='CreateSection' component={CreateSectionScreen} />
    </Stack.Navigator>
  );
};

export default LibraryTab;
