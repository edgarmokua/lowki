import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import{ListItem,Avatar} from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({id, chatName, enterchat}) => {
    const[chatmessages,setChatMessages] = useState([])

    useEffect(() => {
       const unsubscribe =db
          .collection('chats')
          .doc(id)
          .collection("messages")
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data()))
          )

          return unsubscribe
    });
    return (
       <ListItem  onPress={() => enterchat(id,chatName)} key={id} bottomDivider>
           <Avatar
  rounded
  source= {{
      uri:
      chatmessages?.[0]?.photoURL ||
       "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png",
  }}
/>
    <ListItem.Content>
          <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode={'tail'}>{chatmessages?.[0]?.displayName}: {chatmessages?.[0]?.message}</ListItem.Subtitle>
        </ListItem.Content>

       </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
   
})
