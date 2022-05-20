import React from 'react';
import {View, Button, Icon} from 'native-base';
import {AntDesign} from '@expo/vector-icons';

type AddBookButtonProps = {
  onPress: () => void
}

const AddBookButton = (props: AddBookButtonProps) => {
  return (
    <View style={{position: 'absolute', right: 10, bottom: 10}}>
      <Button style={{margin: 5}} onPress={ props.onPress }>
        <Icon as={AntDesign} name='plus' color={'white'} size={8}/>
      </Button>
    </View>
  );
};

export default AddBookButton;
