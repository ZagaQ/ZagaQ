import React from 'react';
import {Pressable, HStack, Center, Text, VStack, Spacer} from 'native-base';
import Section from '../../../../../../script/class/Section';
import SectionActionButton from './SectionActionButton';

type LibrarySectionItemProps = {
  bookId: string
  id: string
  data: Section
  reload: () => Promise<void>
}

const LibrarySectionItem: React.VFC<LibrarySectionItemProps> = (
    {bookId, id, data, reload},
) => {
  return (
    <Pressable>
      <HStack
        backgroundColor='blue.100'
        borderBottomWidth={1}
        borderBottomColor="gray.400"
        p={0.5}
      >
        <Center>
          <Text fontSize="lg" bold m={1}>{data.title}</Text>
        </Center>
        <Spacer />
        <VStack>
          <SectionActionButton
            item={{
              bookId: bookId,
              sectionId: id,
              section: data,
            }}
            reload={reload}
          />
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default LibrarySectionItem;
