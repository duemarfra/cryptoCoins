import React from 'react'

import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';

import MyBlur from "../components/MyBlur";
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {

  const [ email, setEmail ] = React.useState("")
  const [ password, setPassword ] = React.useState("")

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleLogin = ()=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log("Signed in!")
      // Alert.alert("Signed in!")
      Toast.show({
        type: 'success',
        text1: "Welcome!!",
        text2: "Signed in successfully",
      });

      const user = userCredential.user;
      // console.log(user)
      
      navigation.navigate(" FlatListApiCoinSS ")
    })
    .catch((error)=>{
      console.log("Email or password are incorrect")
      // Alert.alert("Email or password are incorrect")
      Toast.show({
        type: 'error',
        text1: "Error Log In",
        text2: "Email or password are incorrect",
      });
    })
  }

  const { height } = Dimensions.get("window")

  return (
    <>
      <MyBlur/>

        <ScrollView>

            <View style = { styles.contentContainer } >
              
              <View style = { { marginTop: "30%", marginBottom: "35%" } } >
                <Text style={styles.title} >Hello Again!</Text>

                <Text style={styles.body} >Welcome back you've been missed!</Text>
              </View>

              <TextInput
                style={ styles.input }
                placeholder = " Enter email "
                autoCorrect = { false }
                onChangeText={ (text) => setEmail(text) }
              />

              <TextInput
                style={ styles.input }
                placeholder = " Password "
                autoCorrect = { false }
                secureTextEntry = { true }
                onChangeText={ (text) => setPassword(text) }
              />

              <TouchableOpacity>
                <Text style = { [
                  styles.buttonsText,
                  {
                    fontWeight: "bold",
                    lineHeight: 30,
                    textAlign: "right",
                  }
                ] } >Recovery Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = { handleLogin }
                style = { styles.loginButton }
              >
                <Text style = { {
                    fontWeight: "bold",
                    color: "white"
                  } } >Log In</Text>
              </TouchableOpacity>

              <View style={{alignItems: "center"}} >
                <View style={{flexDirection: 'row'}} >
                  <Text
                    style = { {
                      textAlign: "center",
                      fontWeight: "bold",
                      lineHeight: 30,
                    } }
                  >
                    Not a user yet? Sign up
                  </Text>
                  <Text
                    style = { [
                      styles.buttonsText,
                      {
                        fontWeight: "bold",
                        lineHeight: 30,
                        textAlign: "center",
                      }
                    ] }
                    onPress={()=>{
                      navigation.navigate(" RegisterSS ")
                    }}
                  >
                    {" "}here
                  </Text>
                </View>
              </View>

            </View>
        </ScrollView>
    
    </>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },

  contentContainer: {
    padding: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#353147",
    paddingTop: 10,

    textShadowColor: '#DAA520',
    // textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  body: {
    padding: 20,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "400",
    textAlign: "center",
    color: "#353147",
    marginBottom: 20,
    textShadowColor: '#DAA520',
    textShadowRadius: 10
  },
  buttonsText:{
    fontWeight: "500",
    color: "#353147"
  },
  input: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#DAA520",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.27,
    elevation: 9
  },
  image: {
    width: 50,
    height: 50,
  },

})