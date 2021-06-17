import React,{useState, useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native'
import { Input,Image,Button,Text } from 'react-native-elements';
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [fullName, setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')

    useLayoutEffect(() => {
       navigation.setOptions({
           headerBackTitle: "Back to Login"
       })
    }, [navigation])

    const register = () => {
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
        authUser.user.updateProfile({
            displayName: fullName,
            photoURL: profileImage || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png",
        });
    })
    .catch((error) => alert(error.message));
    }
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50, color: "#2C6BED"}}>Create Lowki Account</Text>
            <View style={styles.inputContainer}>
               <Input color="#fff" placeholder="Full Name" autoFocus type="text" value={fullName} onChangeText={text => setFullName(text)}/>
               <Input  color="#fff" placeholder="Email"  type="email" value={email} onChangeText={text => setEmail(text)}/>
               <Input color="#fff" placeholder="Password" secureTextEntry type="password" value={password} onChangeText={text => setPassword(text)}/>
               <Input color="#fff"  placeholder="Profile Picture URL(Optional)"  type="text" value={profileImage} onChangeText={text => setProfileImage(text)} onSubmitEditing={register}/>
           </View>
           <Button containerStyle={styles.button} raised onPress={register} title="Register" />
           <View style={{height: 100}}/>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'black'
    },
    button: {
    width:200,
    marginTop: 10,
    },
    inputContainer: {
        width:300,
    }
})
