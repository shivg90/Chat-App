import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// onSnapshot implements real time communication by acting as a listener

const Chat = ({route, navigation, db, isConnected}) => {
    const { name, color, userID} = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

    // stores messages to localStorage (asyncStorage)
    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedMessages));
    }
    // same logic as when using localStorage, and "try-catch" is an error handler
    const cacheMessages = async (messagesToCache) => {
      try {
          await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
          console.log(error.message);
      }
    }
    // must declare outside of the useEffect function so that the reference to old onSnapShot () is not lost
    let unsubscribe;
    
    // if there's a connection: fetch messages from firebase, if not: load from Async storage (loadCachedMessages)
    useEffect(() => {
      if (isConnected === true) {
      if (unsubscribe) unsubscribe();
      unsubscribe = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((doc) => {
        const newMessage = doc.data();
        newMessage.createdAt = new Date(newMessage.createdAt.toMillis());
        newMessages.push(newMessage);
        });
        cacheMessages(newMessages)
        setMessages(newMessages);
      });
      } else loadCachedMessages();
        return () => {
          if (unsubscribe) unsubscribe();
      }
      
    }, [isConnected]);
  

    useEffect(() => {
        navigation.setOptions({ title: name });
      }, []);

    
    const renderBubble = (props) => {
      return <Bubble
        {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
    }

    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }
      
 return (
   <View style={[styles.container, { backgroundColor: color }]}>
     <GiftedChat 
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        avatar: 'https://picsum.photos/140',
        name: name
      }}
    />
    {/* fix for blocked view on android */}
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   padding: 15
 }
});

export default Chat;