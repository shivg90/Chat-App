import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA741lfFg5GoRi5LgccogQUGjv8jqCwSxE",
    authDomain: "chat-app-cf7d7.firebaseapp.com",
    projectId: "chat-app-cf7d7",
    storageBucket: "chat-app-cf7d7.appspot.com",
    messagingSenderId: "869882214288",
    appId: "1:869882214288:web:abba80445c90c0822f2515"
  };

  // initializing firebase
  const app = initializeApp(firebaseConfig);

  // db is object that can be passed to Start or Chat to read and write to/from database
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;