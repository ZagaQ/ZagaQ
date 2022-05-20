import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LibraryScreen from './screen/library/LibraryScreen';
import CreateBookScreen from './screen/createBook/CreateBookScreen';
import UpdateBookScreen from './screen/updateBook/UpdateBookScreen';
import Book from '../../../script/class/Book';

export type LibraryStackParamList = {
  Library: undefined;
  CreateBook: undefined;
  UpdateBook: {id: string, book: Book};
}

const Stack = createNativeStackNavigator<LibraryStackParamList>();

const LibraryTab: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Library' component={LibraryScreen} />
      <Stack.Screen name='CreateBook' component={CreateBookScreen} />
      <Stack.Screen name='UpdateBook' component={UpdateBookScreen} />
    </Stack.Navigator>
  );
};

export default LibraryTab;
