import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Image, Dimensions } from 'react-native'
import * as globals from './globals.js'
import io from "socket.io-client";

export default class Trapezi extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = props.cards
    this.state = {
      cards: props.cards,
      socket: props.socket,
      position: props.position,
    };
  }

/*      this.setState({ cards: [...this.state.cards.slice(0, 1), 
      { image: "https://deckofcardsapi.com/static/img/2S.png",
              value: "KING",
              suit: "HEARTS",
              code: msg },
      ...this.state.images.slice(3)]
      });
*/

  componentDidMount() {
    //this.socket = io("http://10.0.1.58:3000");
    //this.socket = io(globals.server.url + ":" + globals.server.port);
    this.state.socket.on("played card", msg => {
      cardPos = (msg.position - this.state.position + 4) % 4
      //cardPos = 0;
      console.log("Trapezi received " + msg.card.rank + msg.card.suit + " " + msg.position);
      let newCards = [...this.state.cards]
      newCards[cardPos] = { 
              rank: msg.card.rank,
              suit: msg.card.suit,
              }
      this.setState({ cards: newCards})
    })
    this.state.socket.on("reset table", () => {
      this.setState({ cards: this.defaultState })
    })
  }

  playCard = (card) => {
    //this.setState(prevState => ({spades: ["4", "3", "2"]}))
    //console.log(this.state)
    //this.updateXeri();
  }

  placeCardImages = (loc) => {
    //console.log("dfg" + this.state.cards[0].value);
    if (this.state.cards[loc].code === "NC")
      return (
        <Image
          style={styles.card}
          source={require('./assets/KH.png')}
        />
      )
    else
      return(
        <Image
          style={styles.card}
          source={{uri: this.state.cards[loc].image}}
        />
      )
  }

  placeCard = (loc) => {
    //console.log("dfg" + this.state.cards[0].value);
      return (
        <Text style={styles.card}>
          {this.state.cards[loc].rank + this.state.cards[loc].suit}
        </Text>
      )
  }

  render() {
    return(
      <View style={styles.trapeziContainer}>
        {this.placeCard(3)}
        <View style={styles.middleCards}>
          {this.placeCard(2)}
          {this.placeCard(0)}
        </View>
        {this.placeCard(1)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trapeziContainer: {
    flex: 1,
    //flexGrow: 1,
    flexDirection: 'row',
    width: globals.dimensions.fullWidth / 3,
    //width: 0.5,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    height: globals.dimensions.fullHeight *4 / 15,
    //marginRight:40,
    //marginLeft:40,
    //marginTop:10,
    //paddingTop:20,
    //paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: "#F5FCFF",
    //paddingTop: Constants.statusBarHeight,
  },
  card: {
    height: globals.dimensions.fullHeight *2 / 20,
    //resizeMode: 'contain',
    alignSelf: 'center',
    //position: 'absolute',
  },
  middleCards: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  cards: {
    //flexDirection: 'row',
  },
})

