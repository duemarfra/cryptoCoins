import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { getAuth, signOut, deleteUser } from "firebase/auth";

import Toast from 'react-native-toast-message';

const SettingsScreen = ({navigation}) => {

  const auth = getAuth();
  const user = auth.currentUser;
  const deleteMyUser = ()=>{
    deleteUser(user)
              .then(() => {

                signOut(auth)
                  .then(() => {
                      navigation.navigate(" WelcomeSS ")
                      console.log("Account Deleted successfully")
                      // Alert.alert("Account Deleted successfully")
                      Toast.show({
                        type: 'success',
                        text1: "Delete Account",
                        text2: "Account Deleted successfully ✅",
                      });
                    })
        
              }).catch(error=>{

                signOut(auth)
                  .then(() => {
                      navigation.navigate(" LoginSS ")
                      console.log(error.message)
                      console.log("Your Account Wasn't Deleted, try again")
                      // Alert.alert("Your Account Wasn't Deleted, try again")
                      Toast.show({
                        type: 'error',
                        text1: "Delete Account ❌",
                        text2: "Your Account Wasn't Deleted, try again",
                      });
                    })
              });
  }

  return (
    <View style={{flex: 1, backgroundColor: "#000000"}} >
        <Text
            style = { {
                fontSize: 25,
                textAlign: "center",
                marginTop: "20%",
                color: "#FFFFFF"
            } } >
            SettingsScreen
        </Text>

        <TouchableOpacity
          onPress = {deleteMyUser}

          style = { styles.logOutButton }
        >
          <Text style = { {
              fontWeight: "bold",
              color: "white"
            } } >Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {()=>{navigation.navigate(" EditUserEmailSS ")}}
          style = { styles.logOutButton }
        >
          <Text style = { {
              fontWeight: "bold",
              color: "white"
            } } >Edit User Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {()=>{navigation.navigate(" EditUserPasswordSS ")}}
          style = { styles.logOutButton }
        >
          <Text style = { {
              fontWeight: "bold",
              color: "white"
            } } >Edit User Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {
            () => {
              signOut(auth)
              .then(() => {
                  navigation.navigate(" WelcomeSS ");
                  Toast.show({
                    type: 'success',
                    text1: "Log out",
                    text2: "Log Out successfully",
                  });
                })
            }
          }
          style = { styles.logOutButton }
        >
          <Text style = { {
              fontWeight: "bold",
              color: "white"
            } } >Log Out</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logOutButton: {
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

})

export default SettingsScreen