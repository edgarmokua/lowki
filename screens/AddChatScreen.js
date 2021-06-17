import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text,SafeAreaView, View } from 'react-native'
import { Input,Icon,Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebase';


const AddChatScreen = ({navigation}) => {
    const[input,setInput] = useState('')

    const createChat = async() => {
await db.collection('chats').add({
    chatName: input
}).then(() => {
    navigation.goBack()
}).catch((error) => alert(error))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add New Chat Room',
            headerBackTitle: "Chats",
            headerStyle: {backgroundColor: '#2C6BED'},
        })
     }, [])
    return (
        <SafeAreaView style={styles.container}>
             <StatusBar style="light"/>
             <View style={styles.inputContainer}>
          <Input color="#fff" placeholder="Enter a Chat Room Name" autoFocus value={input} onSubmitEditing={createChat} onChangeText={(text) => setInput(text)} leftIcon={
              <Icon name="wechat" type="antdesign" size={24} color="#2C6BED" />
          }/>
          </View>
          <Button style={styles.button} disabled={!input} onPress={createChat} title="Create Chat Room"/>
        </SafeAreaView>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
 container: {
 backgroundColor: '#000',
 padding: 30,
 height: "100%",
 },
 inputContainer: {
     width:300,
     marginTop: 20,
     marginLeft:10,
 },
 button: {

 }
})
