import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,SafeAreaView,ScrollView,TextInput, Keyboard,TouchableWithoutFeedback} from 'react-native'
import { Avatar } from 'react-native-elements'
import {FontAwesome,Ionicons} from 'react-native-vector-icons'
import { StatusBar } from 'expo-status-bar';
import { db,auth } from '../firebase';
import firebase from 'firebase/app'




const ChatScreen = ({navigation, route}) => {
    const[input,setInput] = useState('')
    const [messages,setMessages] = useState([])

     const sendMessage = () => {
     Keyboard.dismiss();
     db.collection('chats').doc(route.params.id).collection('messages').add({
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         message: input,
         displayName: auth.currentUser.displayName,
         email: auth.currentUser.email,
         photoURL: auth.currentUser.photoURL
     })
     setInput('')
     }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerStyle: {backgroundColor: '#2C6BED'},
            headerTitle: () => (
                <View style={{flexDirection: "row",alignItems: "center"}}>
               <Avatar rounded source={{uri:
                 messages[0]?.data.photoURL}} />
               <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
               </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: "row", justifyContent:"space-between", width: 80, marginRight:20}}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color='#fff'/>
                    </TouchableOpacity>

                </View>
            )
        })
     }, [navigation,messages])

     useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
           
        return unsubscribe
    },[route])
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#000"}}>
             <StatusBar style="light"/>
            <View
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                <ScrollView contentContainerStyle={{paddingTop: 15}}>
                    {messages.map(({id,data}) => (
                        data.email === auth.currentUser.email ? (
                           <View key={id} style={styles.sender}>
                               <Avatar position ="absolute" 
                               //WEB
                               containerStyle={{
                                position : "absolute",
                                bottom: -15,
                                right: -5,
                               }}
                               size={30} right={-5} bottom={-15} rounded source={{uri: data.photoURL}}/>
                               <Text style={styles.senderText}>{data.message}</Text>
                               </View>
                        ): (
                          <View key={id} style={styles.receiver}> 
                                <Avatar position ="absolute" 
                               //WEB
                               containerStyle={{
                                position : "absolute",
                                bottom: -15,
                                left: -5,
                               }}
                               size={30} right={-5} bottom={-15} rounded source={{uri: data.photoURL}}/>
                               <Text style={styles.receiverText}>{data.message}</Text>
                               <Text style={styles.receiverName}>{data.displayName}</Text>

                              </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput value={input}onSubmitEditing={sendMessage} onChangeText={text => setInput(text)} placeholder="Lowki Message" style={styles.TextInput}/>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons name="send" size={24} color="#2C6BED"/>
                    </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    sender: {
        padding:15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    receiver: {
        padding:15,
        backgroundColor: '#2C6BED',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color:"white",
    },
    senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
        },
    footer: {
     flexDirection: "row",
     alignItems: "center",
     width:"100%",
     padding:15,

    },
    TextInput: {
    bottom:0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding:10,
    color: "grey",
    borderRadius: 30,
    } 
})
