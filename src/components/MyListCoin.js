import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { getAuth } from "firebase/auth";
import { database } from "../config/firebase-config";
import { collection, addDoc, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { size } from 'lodash';

const MyListCoin = ({ item }) => {

  const auth = getAuth();
  const user = auth.currentUser;
  
  const navigation = useNavigation();

  const {
    id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    market_cap_rank,
    fully_diluted_valuation,
    total_volume,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    market_cap_change_24h,
    market_cap_change_percentage_24h,
    circulating_supply,
    total_supply,
    max_supply,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    roi,
    last_updated,
  } = item;

  useEffect(()=>{
    (async()=>{
      const response = await getIsFavorite(item)
      if (size(response)>0) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    })()
  }, [item])

  const [favorite, setFavorite] = useState(false);

  const addFavorite = async () => {
    await addDoc(collection(database, "favorites"), {
      idUser: user.uid,
      idFavorite: item.image,
    })
    setFavorite(!favorite);
  };
  
  const removeFavorite = async () => {
    let favoriteId = null

    const q = query(collection(database, "favorites"), where("idUser", "==", user.uid), where("idFavorite", "==", item.image));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      favoriteId = doc.id
    });

    const docRef = doc(database, "favorites", favoriteId )
    deleteDoc(docRef)
    setFavorite(!favorite);
  };

  const getIsFavorite = async() => {
    const q = query(collection(database, "favorites"), where("idUser", "==", user.uid), where("idFavorite", "==", item.image));
    const result = await getDocs(q);
    return result.docs
  }
  
  return (
    <View style={[styles.container, {borderColor: "#DAA520", borderWidth: 2}]}>
      <TouchableOpacity
        onPress={() => navigation.navigate(" CoinSS ", { item: item })}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: item.image }} />

          <View>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>

            <Text style={styles.myTextSymbol}>{symbol} </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <View>
          <Text style={styles.myText}> $USD {current_price} </Text>
          <Text
            style={[
              styles.pricePercentage,
              price_change_percentage_24h > 0
                ? styles.pricePercentageUp
                : styles.pricePercentageDown,
            ]}
          >
            {" "}
            {price_change_percentage_24h}{" "}
          </Text>
        </View>
        <View>
        {favorite? (
              <Text onPress = {removeFavorite} style={styles.heart}>🏆️</Text>
            ) : (
              <Text onPress = {addFavorite} style={styles.heart}>🤍</Text>)}
        </View>
      </View>
    </View>
  );
};

export default MyListCoin;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fefefe",
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  myText: {
    color: "#000000",
  },
  myTextSymbol: {
    color: "#00000050",
    textTransform: "uppercase",
  },
  image: {
    marginRight: 10,
    height: 30,
    width: 30,
  },
  pricePercentage: {
    textAlign: "right",
  },
  pricePercentageUp: {
    color: "#00FF2A",
  },
  pricePercentageDown: {
    color: "#FF0000",
  },
  heart: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: -20,
  },
});