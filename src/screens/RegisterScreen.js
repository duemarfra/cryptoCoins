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

import Toast from 'react-native-toast-message';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';

import MyBlur from "../components/MyBlur";

const RegisterScreen = ({navigation}) => {

  // const showToast = () => {
  //   Toast.show({
  //     type: 'info',
  //     text1: 'Hello',
  //     text2: 'This is some something 👋',
  //     position: "bottom",
  //     // position: "top",
  //     visibilityTime: 7000
  //   });
  // }


  const [ email, setEmail ] = React.useState("")
  const [ password, setPassword ] = React.useState("")
  const [ passwordConfirm, setPasswordConfirm ] = React.useState("")

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleCreateAccount = ()=>{

    if (password == passwordConfirm ) {

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        console.log( "Acount Created!" )
        const user = userCredential.user;
        console.log(user)
        navigation.navigate(" FlatListApiCoinSS ")

        console.log("Acount Created!")
        // Alert.alert( "Acount Created!" )

        Toast.show({
          type: 'success',
          text1: `"Acount Created!`,
          text2: `"Welcome 🤗`
        });

      })
      .catch(error=>{
        console.log(error.message)
        // Alert.alert(error.message)

        Toast.show({
          type: 'error',
          text1: `Account was not created`,
          text2: `Email already in use`
        });

      })

    } else {
      console.log("Passwords don't match")
      // Alert.alert("Passwords don't match")

      Toast.show({
        type: 'error',
        text1: 'Password ❌',
        text2: 'Passwords do not match'
      });
    }

    
  }

  const { height } = Dimensions.get("window")

  return (
    <>
      <MyBlur/>
      <Image
        style={styles.imageBackground}
        source={ require( '../../assets/bitcoin.png' ) }
      />

        <ScrollView>

            <View style = { styles.contentContainer } >
              

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

              <TextInput
                style={ styles.input }
                placeholder = " Confirm Password "
                autoCorrect = { false }
                secureTextEntry = { true }
                onChangeText={ (text) => setPasswordConfirm(text) }
              />

              <TouchableOpacity
              onPress = { handleCreateAccount }
               style = { styles.loginButton }
              >
                <Text style = { {
                    fontWeight: "bold",
                    color: "white"
                  } } >Create Account</Text>
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
                    Already a registered user? login
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
                      navigation.navigate(" LoginSS ")
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

export default RegisterScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  imageBackground: {
    width: "100%",
    height: 390,
    position: "absolute",
    // marginTop: -70,
    // marginBottom: -90
  },
  
  contentContainer: {
    padding: 30,
    width: "100%",
    marginTop: "90%"
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