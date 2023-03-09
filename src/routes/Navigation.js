import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase-config';

//screns

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FlatListApiCoin from '../screens/FlatListApiCoin';
import CoinScreen from '../screens/CoinScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import EditUserEmailScreen from '../screens/EditUserEmailScreen';
import EditUserPasswordScreen from '../screens/EditUserPasswordScreen';

//icons

// import { Entypo } from "@expo/vector-icons";

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

//logic for Stack Navigator

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName=" WelcomeSS ">
      <Stack.Screen
        name=" WelcomeSS "
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" RegisterSS "
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" LoginSS "
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" FlatListApiCoinSS "
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" CoinSS "
        component={CoinScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" EditUserEmailSS "
        component={EditUserEmailScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name=" EditUserPasswordSS "
        component={EditUserPasswordScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

//logic for Boottom Tab Navigator

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      // initialRouteName=" FlatListApiCoinTS "
      activeColor="#DAA520"
      inactiveColor="#DFCEDF"
      // labelStyle={{ fontSize: 45 }}
      barStyle={{
        backgroundColor: '#000000',
        // paddingBottom: 48
        // marginTop: 10
        // fontSize: 30
      }}
    >

      <Tab.Screen
        name=" FlatListApiCoinTS "
        component={FlatListApiCoin}
        options={{
          tabBarLabel: " Coins ",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="coins" size={25} color={color} />
          ),
          // headerShown: false,
        }}
      />

      <Tab.Screen
        name=" FavoritesTS "
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color }) => (
            <AntDesign name="heart" size={25} color={color} />
          ),
          // headerShown: false,
        }}
      />

      <Tab.Screen
        name=" SettingsTS "
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={25} color={color} />
          ),
          // headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  // const auth = getAuth()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  
  return (
    <NavigationContainer>
      {auth? <MyStack/> : <MyTabs/> }
    </NavigationContainer>
  );
}
