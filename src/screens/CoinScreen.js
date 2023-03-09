import { StyleSheet, Text, ScrollView,ImageBackground , View } from 'react-native'
import * as React from 'react'
import { VictoryArea, VictoryChart, VictoryClipContainer, VictoryPie } from 'victory-native'

const CoinScreen = ( { route } ) => {

  const { item } = route.params

  const data = [

      { x: "Mon", y: 1, y0: 0 },
      { x: "Tues", y: 2, y0: 0 },
      { x: "wed", y: 4, y0: 0 },
      { x: "Thurs", y: 3, y0: 0 },
      { x: "Fri", y: 5, y0: 0 },
      { x: "Sat", y: 4, y0: 0 },
      { x: "Sun", y: 20, y0: 0 }
  ];

  return (

    <ScrollView style={{backgroundColor: "#000000"}} >

      <View style = { styles.containerTitle } >
        <Text style = { styles.title } >
          {item.name}
        </Text>
      </View>

      <View style = { styles.containerGraphic1 } >

        <ImageBackground
          style = { styles.image }
          source = { { uri: item.image } }
        >

          <View style = { styles.graphic } >

            <VictoryChart maxDomain={{ y: 6 }} >
              <VictoryArea

                interpolation="natural"

                groupComponent = {
                  <VictoryClipContainer
                    clipPadding={
                      { top: 5, right: 10 }
                    }
                  />
                }

                style={{
                  data: {
                    fill: "#00000090",
                    stroke: "#DAA520",
                    strokeWidth: 8,
                    strokeLinecap: "round"
                  },
                }}

                data={data}

              />
            </VictoryChart>
            
          </View>

        </ImageBackground>
      </View>

      <VictoryPie
        
        data={[
          { x: "Btc", y: 55 },
          { x: "Eth", y: 25 },
          { x: "Doge", y: 20 }
        ]}

        colorScale={[
          "red",
          "orange",
          "gold",
          "cyan",
          "navy"
        ]}
        
      />

      <View style = { styles.containerAttributes } >

        <View>
          <Text style = { styles.attributeName } >name:</Text>
          <Text style = { styles.attributeName } >symbol:</Text>
          <Text style = { styles.attributeName } >current price:</Text>
          <Text style = { styles.attributeName } >market cap:</Text>
          <Text style = { styles.attributeName } >market cap rank:</Text>
          <Text style = { styles.attributeName } >fully diluted valuation:</Text>
          <Text style = { styles.attributeName } >total volume:</Text>
          <Text style = { styles.attributeName } >high 24h:</Text>
          <Text style = { styles.attributeName } >low 24h:</Text>
          <Text style = { styles.attributeName } >price change 24h:</Text>
          <Text style = { styles.attributeName } >price change percentage 24h:</Text>
          <Text style = { styles.attributeName } >market cap change 24h:</Text>
          <Text style = { styles.attributeName } >circulating supply:</Text>
          <Text style = { styles.attributeName } >total supply:</Text>
          <Text style = { styles.attributeName } >max supply:</Text>
          <Text style = { styles.attributeName } >ath:</Text>
          <Text style = { styles.attributeName } >ath change percentage:</Text>
          <Text style = { styles.attributeName } >atl:</Text>
          <Text style = { styles.attributeName } >atl change percentage:</Text>
        </View>

        <View>
          <Text>{item.name}</Text>
          <Text>{item.symbol}</Text>
          <Text>{item.current_price}</Text>
          <Text>{item.market_cap}</Text>
          <Text>{item.market_cap_rank}</Text>
          <Text>{item.fully_diluted_valuation}</Text>
          <Text>{item.total_volume}</Text>
          <Text>{item.high_24h}</Text>
          <Text>{item.low_24h}</Text>
          <Text>{item.price_change_24h}</Text>
          <Text>{item.price_change_percentage_24h}</Text>
          <Text>{item.market_cap_change_24h}</Text>
          <Text>{item.circulating_supply}</Text>
          <Text>{item.total_supply}</Text>
          <Text>{item.max_supply}</Text>
          <Text>{item.ath}</Text>
          <Text>{item.ath_change_percentage}</Text>
          <Text>{item.atl}</Text>
          <Text>{item.atl_change_percentage}</Text>
        </View>

      </View>

    </ScrollView>
  )
}

export default CoinScreen

const styles = StyleSheet.create({

  image: {
    height: 300,
     width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  
  containerTitle: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    padding: "1%",
    fontSize: 25,
    fontWeight: "bold",
    color: "#DAA520"
  },

  containerGraphic1: {
    alignItems: "center",
    paddingBottom: 80,
    paddingHorizontal: "6%",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    borderRadius: 30,
  },

  graphic: {
    marginTop: 180
  },

  containerAttributes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 30,
  },

  attributeName: {
    fontWeight: "bold"
  },
  
});