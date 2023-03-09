import { StyleSheet, Text, FlatList, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';

import MyListCoin from '../components/MyListCoin';

import { getAuth } from "firebase/auth";
import { database } from "../config/firebase-config";
import { collection, addDoc, deleteDoc, getDocs, query, where, doc, docs, onSnapshot, orderBy } from 'firebase/firestore';
import { size } from 'lodash';

const FlatListApiCoin = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [myFavorites, setMyFavorites] = useState([]);

  const [finalCoins, setFinalCoins] = useState([]);

  const myKeyboard = <FontAwesome name="keyboard-o" size={24} color="#DAA520" />

  const [coins, setCoins] = useState([])

  const [search, setSearch] = useState("")

  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json()
    setCoins(data)
  }

  useEffect(() => {

    loadData()

    const collectionRef = collection(database, "favorites")
    const q = query(collectionRef, where("idUser", "==", user.uid))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMyFavorites(
        querySnapshot.docs.map((doc) => ({
          idFavorite: doc.data().idFavorite,
        }))
      )
    })
    return unsubscribe
  }, [])

  const getFinalFav = () => {

    setFinalCoins([])
    
    myFavorites.map((favorites) =>{
      const filtrados = coins.filter(item => item.image == favorites.idFavorite)
      setFinalCoins((prevState)=> [...prevState, ...filtrados])
    })
    console.log(finalCoins)
  }

  console.log(finalCoins)

  return (
    <View style={{flex: 1, backgroundColor: "#000000"}} >

      <View style = { styles.container } >
        
        <Text style = { styles.title } >My favorite coins:</Text>
        <Text onPress={getFinalFav} style = { styles.title } ><FontAwesome name="refresh" size={24} color="#DAA520" /></Text>

        <View style={ { flexDirection: "row", textAlign: "center" } } >

          <Text style={ { padding: 3  } } >{myKeyboard}</Text>
          
          <TextInput
            style = { styles.myInput }
            placeholder = {"Search a Coin"}
            placeholderTextColor = "#DAA520"
            onChangeText={ (text) => setSearch(text) }
          />

        </View>
      </View>

      <FlatList

        data={finalCoins.filter(
          ( coin ) => coin.name.toLowerCase().includes( search ) || coin.symbol.toLowerCase().includes( search )
        )}

        keyExtractor={(item) => item.id}

        renderItem={ ({ item }) => <MyListCoin item = { item } /> }

        ItemSeparatorComponent = { () => <View style = { { marginVertical: 10, borderColor: "#DAA520", borderWidth: 0.5 } } /> }

        showsVerticalScrollIndicator = { false }

        refreshing = { refreshing }
        onRefresh = { async() => {
          setRefreshing(true);
          await loadData();
          await getFinalFav();
          setRefreshing(false)
        } }

      />
    </View>
  )
}

export default FlatListApiCoin

const styles = StyleSheet.create({
  myInput: {
    backgroundColor: "#F4EEF4",
    borderColor: "#D6D6D6",
    borderWidth: 1,
    marginVertical: "2%",
    paddingHorizontal: 10,
    borderRadius: 13,
    textAlign: "center"
  },
  title:{
    fontWeight: "bold",
    fontSize: 18,
    color: "#DAA520"
  },
  container: {
    flexDirection: 'row',
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    alignItems: 'center',
    justifyContent: 'space-between'
},
})