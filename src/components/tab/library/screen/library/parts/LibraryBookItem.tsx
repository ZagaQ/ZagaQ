import React from 'react';
import Book from '../../../../../../script/class/Book';
import {
  Pressable,
  HStack,
  Center,
  Text,
  VStack,
  Spacer,
  FlatList} from 'native-base';
import BookActionButton from './BookActionButton';
import LibrarySectionItem from './LibrarySectionItem';
import Section from '../../../../../../script/class/Section';

type LibraryBookItemProps = {
  id: string
  book: Book
  sections: {[id:string]: Section}
  reload: () => Promise<void>
}

const LibraryBookItem: React.VFC<LibraryBookItemProps> = (
    {id, book, sections, reload},
) => {
  return (
    <>
      <Pressable>
        <HStack
          backgroundColor="amber.100"
          borderBottomWidth={1}
          borderBottomColor="gray.400"
          p={1}
        >
          <Center>
            <Text fontSize="lg" bold m={1}>{book.title}</Text>
          </Center>
          <Spacer />
          <VStack>
            <BookActionButton
              item={{
                'key': id,
                'value': book,
              }}
              reload={reload}
            />
          </VStack>
        </HStack>
      </Pressable>
      <FlatList
        data={Object.entries(sections).map(([key, value]) => ({key, value}))}
        renderItem={({item}) =>
          <LibrarySectionItem bookId={id} id={item.key} data={item.value} />
        }
      />
    </>
  );
};

export default LibraryBookItem;
