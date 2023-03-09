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

import Toast from 'react-native-toast-message';

import { getAuth, updateEmail, signOut  } from 'firebase/auth';

import MyBlur from "../components/MyBlur";

const EditUserEmailScreen = ({navigation}) => {

  const [ newEmail, setNewEmail ] = React.useState("")

  const auth = getAuth()

  const handleUpdateEmail = ()=>{

    updateEmail(auth.currentUser, newEmail)
        .then(() => {

          signOut(auth)
            .then(() => {
                navigation.navigate(" LoginSS ")
                console.log("Email Updated Successfully")
                // Alert.alert("Email Updated Successfully")

                Toast.show({
                  type: 'success',
                  text1: 'Email Updated!',
                  text2: 'Email Updated Successfully!!'
                });

              })
        
        }).catch(error=>{

          signOut(auth)
            .then(() => {
                navigation.navigate(" LoginSS ")
                console.log(error.message)
                // Alert.alert("Your Email Wasn't Updated, try again")
                
                Toast.show({
                  type: 'error',
                  text1: "Email wasn't Updated!",
                  text2: "Your Email Wasn't Updated, try again",
                });
                
              })
        });

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
                placeholder = " Enter New Email "
                autoCorrect = { false }
                onChangeText={ (text) => setNewEmail(text) }
              />

              <TouchableOpacity
                onPress = { handleUpdateEmail }
                style = { styles.loginButton }
              >
                <Text style = { {
                    fontWeight: "bold",
                    color: "white"
                  } } >Edit User Email</Text>
              </TouchableOpacity>

            </View>

        </ScrollView>

    </>
  )
}

export default EditUserEmailScreen

const styles = StyleSheet.create({

  imageBackground: {
    width: "100%",
    height: 390,
    position: "absolute",
  },
  
  contentContainer: {
    padding: 30,
    width: "100%",
    marginTop: "100%"
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