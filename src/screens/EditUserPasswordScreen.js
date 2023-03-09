import React from 'react'

import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'

import { getAuth, updatePassword, signOut  } from 'firebase/auth';

import MyBlur from "../components/MyBlur";
import Toast from 'react-native-toast-message';

const EditUserPasswordScreen = ({navigation}) => {

  const [ password, setPassword ] = React.useState("")
  const [ passwordConfirm, setPasswordConfirm ] = React.useState("")

  const auth = getAuth()

  const user = auth.currentUser;

  const handleUpdatePassword = ()=>{

    if (password == passwordConfirm ) {
      
      updatePassword(user, password)
      .then(() => {

        signOut(auth)
            .then(() => {
                navigation.navigate(" LoginSS ")
                console.log("Password Updated Successfully")
                // Alert.alert("Password Updated Successfully")
                Toast.show({
                  type: 'success',
                  text1: 'Password Updated!',
                  text2: 'Password Updated Successfully!!'
                });
              })

      }).catch(error=>{

        signOut(auth)
          .then(() => {
              navigation.navigate(" LoginSS ")
              console.log(error.message)
              // Alert.alert("Your Password Wasn't Updated, try again")
              Toast.show({
                type: 'error',
                text1: "Password wasn't Updated!",
                text2: "Your Password Wasn't Updated, try again",
              });
            })

      });

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
                placeholder = " New Password "
                autoCorrect = { false }
                secureTextEntry = { true }
                onChangeText={ (text) => setPassword(text) }
              />

              <TextInput
                style={ styles.input }
                placeholder = " Confirm New Password "
                autoCorrect = { false }
                secureTextEntry = { true }
                onChangeText={ (text) => setPasswordConfirm(text) }
              />

              <TouchableOpacity
                onPress = { handleUpdatePassword }
                style = { styles.loginButton }
              >
                <Text style = { {
                    fontWeight: "bold",
                    color: "white"
                  } } >Edit User Passwor</Text>
              </TouchableOpacity>

            </View>
        </ScrollView>

    </>
  )
}

export default EditUserPasswordScreen

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
  },
  
  contentContainer: {
    padding: 30,
    width: "100%"
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

  buttonContainer:{
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "#DFE3E630",
    marginTop: 20,
  },
  button1:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff70",
    padding: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    marginHorizontal: 10,
  },
  button2:{
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff30",
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
  }

})