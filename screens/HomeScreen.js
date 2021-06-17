import React,{useLayoutEffect, useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar,Icon } from 'react-native-elements'
import { auth,db } from '../firebase'
import { StatusBar } from 'expo-status-bar';
import {AntDesign, SimpleLineIcons} from 'react-native-vector-icons'

 
const HomeScreen = ({navigation}) => {
const [chats,setChats] = useState([])
const signOut = () => {
    auth.signOut()
    .then(() => {
        navigation.replace('Login')
    })
}

useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
        setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
    ))
    return unsubscribe
},[])
useLayoutEffect(() => {
   navigation.setOptions({
       title: 'Lowki Chats',
       headerStyle: {backgroundColor: '#2C6BED'},
       headerRight: () => (
           <View style={{marginRight: 20,flexDirection: "row", justifyContent: "flex-end", width: 80}}>
           <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
           <SimpleLineIcons name="plus" size={24} color="#fff" />
           </TouchableOpacity>
           </View>
       ),
       headerLeft: () => (
        <View style={{marginLeft: 20}}>
         <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
         <SimpleLineIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
        </View>
    )
   })
}, [])

const enterChat = (id,chatName) => {
navigation.navigate('Chat', {
    id,
    chatName
})
}
    return (
        <SafeAreaView>
            <StatusBar style="light"/>
            <ScrollView>
           {chats.map(({id,data: {chatName}}) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterchat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
 
})
