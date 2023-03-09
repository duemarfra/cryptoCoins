import { StyleSheet, Text, FlatList, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';

import MyListCoin from '../components/MyListCoin';

const FlatListApiCoin = () => {

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
    // console.log(data)
  }

  useEffect(
    () => {
      loadData()
    }, []
  )

  return (
    <View style={{backgroundColor: "#000000", marginBottom: 43}} >

      <View style = { styles.container } >
        
        <Text style = { styles.title } >Coins:</Text>

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

        data={
          coins.filter(
            ( coin ) => coin.name.toLowerCase().includes( search ) || coin.symbol.toLowerCase().includes( search ) || coin.name.includes( search ) || coin.symbol.includes( search )
          )
        }

        keyExtractor={(item) => item.id}

        renderItem={ ({ item }) => <MyListCoin item = { item } /> }

        ItemSeparatorComponent = { () => <View style = { { marginVertical: 10, borderColor: "#DAA520", borderWidth: 0.5 } } /> }

        showsVerticalScrollIndicator = { false }

        refreshing = { refreshing }
        onRefresh = { async() => {
          // console.log("refreshing")
          setRefreshing(true);
          await loadData();
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
    borderColor: "#DAA520",
    borderWidth: 1,
    marginVertical: "2%",
    paddingHorizontal: 10,
    borderRadius: 13,
    textAlign: "center"
  },
  title:{
    fontWeight: "bold",
    color: "#DAA520",
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    alignItems: 'center',
    justifyContent: 'space-between'
},
})