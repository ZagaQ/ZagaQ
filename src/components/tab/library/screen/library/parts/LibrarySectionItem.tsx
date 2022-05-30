import React from 'react';
import {Pressable, HStack, Center, Text, VStack, Spacer} from 'native-base';
import Section from '../../../../../../script/class/Section';

type LibrarySectionItemProps = {
  bookId: string
  id: string
  data: Section
}

const LibrarySectionItem: React.VFC<LibrarySectionItemProps> = ({id, data}) => {
  return (
    <Pressable>
      <HStack
        backgroundColor='blue.100'
        borderBottomWidth={1}
        borderBottomColor="gray.400"
        p={1}
      >
        <Center>
          <Text fontSize="lg" bold m={1}>{data.title}</Text>
        </Center>
        <Spacer />
        <VStack />
      </HStack>
    </Pressable>
  );
};

export default LibrarySectionItem;
