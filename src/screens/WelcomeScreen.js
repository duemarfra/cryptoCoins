import React from 'react'

import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native'

import MyBlur from "../components/MyBlur";

const WelcomeScreen = ({navigation}) => {

  return (
    <>
      

      <MyBlur/>
      <Image
        style={styles.image}
        source={ require( '../../assets/bitcoin.png' ) }
      />

        <ScrollView style={styles.scrollView}>
          
          <View style = { styles.contentContainer } >
            
            <Text style={styles.title} >Discover the real</Text>
            <Text style={styles.title} >Cryptocurrency value</Text>
            <Text style={styles.body} >Explore all the cryptocurrencies on the market and view their value in real time</Text>

            <View style={styles.buttonContainer} >

              <TouchableOpacity
                onPress={ () => navigation.navigate(" RegisterSS ")  }
                style={styles.button1}
              >
                <Text style={styles.buttonsText} >Register</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={ () => navigation.navigate(" LoginSS ")  }
                style={styles.button2}
              >
                <Text style={styles.buttonsText} >Log In</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </ScrollView>
    </>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  // scrollView: {

  // },
  container:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  image: {
    width: "100%",
    height: 390,
    position: 'absolute',
  },
  contentContainer: {
    padding: 30,
    marginTop: "110%"
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#353147",
    paddingTop: 10
  },
  body: {
    paddingTop: 20,
    fontSize: 25,
    lineHeight: 23,
    fontWeight: "400",
    textAlign: "center",
    color: "#353147"
  },

  buttonContainer:{
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#DFE3E630",
    marginTop: 20
  },
  button1:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff70",
    padding: 16,
    borderRadius: 6
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
  }

})