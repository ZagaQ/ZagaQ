import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LibraryScreen from "./screen/library/LibraryScreen"
import CreateBookScreen from "./screen/createbook/CreateBookScreen"

export type LibraryStackParamList = {
  Library: undefined;
  CreateBook: undefined;
}

const Stack = createNativeStackNavigator<LibraryStackParamList>()

const LibraryTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Library' component={LibraryScreen} />
      <Stack.Screen name='CreateBook' component={CreateBookScreen} />
    </Stack.Navigator>
  )
}

export default LibraryTab;
