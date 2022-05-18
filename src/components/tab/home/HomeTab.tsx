import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../library/screen/library/LibraryScreen';

export type HomeStackParamList = {
  Home: undefined;
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeTab;
