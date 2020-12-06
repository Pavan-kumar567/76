import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Image,FlatList,KeyboardAvoidingView} from 'react-native';
import db from '../config';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId: '',
            passsword: ''
        }
    }
    login = async(email,passsword)=>{
        if(email && passsword){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,passsword)
                if(response){
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                switch (error.code){
                    case 'auth/user-not-found':
                        alert("User Dosent Exsist");
                        break;
                    case 'auth/invalid-email':
                        alert("Incorrect Email Or Password");
                        break;
                }
            }
        }
        else{
            alert("Enter Email And Password")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems: 'center', marginTop: 20}}>
                <View>
                    <Image
                        source = {require("../assets/booklogo.jpg")}
                            style = {{width: 200, height: 200}}
                        />
                        <Text style = {{textAlign: 'center', fontSize: 30}}>
                            WILY
                        </Text>
                </View>
                <View>
                    <TextInput
                    style = {styles.loginBox}
                    placeholder = "abc@example.com"
                    keyboardType = "email-address"
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId: text
                        })
                    }}
                    />
                    <TextInput
                    style = {styles.loginBox}
                    placeholder = "Password"
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            passsword: text
                        })
                    }}
                    />
                </View>
                <View>
                    <TouchableOpacity style = {{height:30,width:90,borderWidth:1,marginTop:20,paddingTop: 5,borderRadius:7}}
                        onPress = {()=>{
                            this.login(this.state.emailId,this.state.passsword)
                        }}
                    >
                    <Text style = {{textAlign: 'center'}}>
                        Login
                    </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width:300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 30,
        margin: 10,
        paddingLeft: 10
    }
})