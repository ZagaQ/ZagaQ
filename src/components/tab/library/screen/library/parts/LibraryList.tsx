import {FlatList} from 'native-base';
import React from 'react';
import {ReadBookReturn} from '../../../../../../script/readBook';
import LibraryBookItem from './LibraryBookItem';

type LibraryListProps = {
  data: ReadBookReturn
  reload: () => Promise<void>
}

const LibraryList: React.VFC<LibraryListProps> = ({data, reload}) => {
  return (
    <FlatList
      data={Object.entries(data).map(([key, value]) => ({key, value}))}
      renderItem={({item}) =>
        <LibraryBookItem
          id={item.key}
          book={item.value.book}
          sections={item.value.sections}
          reload={reload}
        />
      }
    />
  );
};

export default LibraryList;
