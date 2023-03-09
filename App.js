import React from 'react'
import Navigation from './src/routes/Navigation';
import "expo-dev-client"
import Toast from 'react-native-toast-message';


export default function App() {
  return (

      <>
        <Navigation/>
        <Toast />
      </>
  )
}
