import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native'
import { Input,Image,Button } from 'react-native-elements';
import {auth} from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
     
    useEffect(() => {
      const unsubscribe =auth.onAuthStateChanged((authUser) => {
          if(authUser){
              navigation.replace('Home');
          }
      });

      return unsubscribe;
    }, [])
    const signIn = () => {
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error))
    }
  
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Image source={{
                uri: "https://cdn.pixabay.com/photo/2016/01/10/22/52/letters-1132703_960_720.png",
            }}
                style={{width: 200,height:200}}
            />
           <View style={styles.inputContainer}>
               <Input color="#fff" placeholder="Email" autoFocus type="email" value={email} onChangeText= {text => setEmail(text)}/>
               <Input color="#fff"  placeholder="Password" secureTextEntry type="password" value={password} onSubmitEditing={signIn} onChangeText={text => setPassword(text)}/>
           </View>
           <Button containerStyle={styles.button} onPress={signIn} title='Login' />
           <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button}  type="outline" title='Register' />
           <View style={{height: 100}}/>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
 inputContainer: {
 width:300,
 marginTop:40
    },
 button: {
   width:200,
   marginTop:10,
    },
 container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
padding: 10,
backgroundColor: 'black'
    }
})
