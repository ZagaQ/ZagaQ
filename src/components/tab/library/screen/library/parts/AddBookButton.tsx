import React from 'react';
import {View, Button, Icon} from 'native-base';
import {AntDesign} from '@expo/vector-icons';

type AddBookButtonProps = {
  onPress: () => void
}

const AddBookButton: React.VFC<AddBookButtonProps> = ({onPress}) => {
  return (
    <View style={{position: 'absolute', right: 10, bottom: 10}}>
      <Button style={{margin: 5}} onPress={onPress}>
        <Icon as={AntDesign} name='plus' color='white' size={8}/>
      </Button>
    </View>
  );
};

export default AddBookButton;
