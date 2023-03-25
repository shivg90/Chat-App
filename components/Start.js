import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const backgroundColors = {
  black: { backgroundColor: '#090C08' },
  grey: { backgroundColor: '#8A95A5' },
  purple: { backgroundColor: '#474056' },
  green: { backgroundColor: '#B9C6AE' }
}

// Start screen
// Name and color are changing states from user input
const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

 return (
  <ImageBackground source={require('../assets/Background-Image.png')} resizeMode="cover" style={styles.image}>
    
      <Text style={styles.title}>Chat App</Text>

      {/* views are like divs */}
      <View style={styles.inputBox}>
       <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Your Name'
       />

       <View>
        <Text style={styles.colorsTitle}>Choose Background Color:</Text>
        <View style={styles.colorsOptions}>
        {/* touchable opacity is like buttons */}
        <TouchableOpacity
            style={[styles.color, backgroundColors.black,
            color === backgroundColors.black.backgroundColor
            ? styles.colorSelected
            : {}
            ]}
            onPress={() =>
            setColor(backgroundColors.black.backgroundColor)
            }
        />

        <TouchableOpacity
            style={[styles.color, backgroundColors.grey,
            color === backgroundColors.grey.backgroundColor
            ? styles.colorSelected
            : {}
            ]}
            onPress={() =>
            setColor(backgroundColors.grey.backgroundColor)
            } 
        />

        <TouchableOpacity
            style={[styles.color, backgroundColors.purple,
            color === backgroundColors.purple.backgroundColor
            ? styles.colorSelected
            : {}
            ]}
            onPress={() =>
            setColor(backgroundColors.purple.backgroundColor)
            }
        />

        <TouchableOpacity
            style={[styles.color, backgroundColors.green,
            color === backgroundColors.green.backgroundColor
            ? styles.colorSelected
            : {}
            ]}
            onPress={() =>
            setColor(backgroundColors.green.backgroundColor)
            }
        />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        // on press navigates to Chat screen with selected name and color state
        onPress={() => navigation.navigate('Chat', { name: name, color: color } )}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    
    </View>
  </ImageBackground>
  
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 },
 textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '300',
    fontSize: 16,
    color: '#757083',
    opacity: 50
  },
  inputBox: {
    height: "44%",
    width: "88%",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    flex: 2,
    justifyContent: 'space-between',
    fontSize: 45,
    fontWeight: 600,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 60
  },
  colorsTitle: {
    fontSize: 16,
    fontWeight: 300,
    color: '#757083',
    opacity: 100
  },
  colorsOptions: {
    flexDirection: 'row'
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8
  },
  button: {
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    width: '88%',
    height: '20%'

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#ffffff'
  }
});

export default Start;