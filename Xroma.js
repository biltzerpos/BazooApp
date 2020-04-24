import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'
import io from "socket.io-client";
import { Icon } from 'react-native-elements'


export default class Xroma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suit: props.suit,
      cards: props.cards,
      socket: props.socket,
      position: props.position,
      balader: " "
    };
    console.log("Xroma constr " + this.state.suit + " " + this.state.cards)
  }

  componentDidMount() {
    //this.socket = io("http://10.0.1.58:3000");
    //this.socket = io(globals.server.url + ":" + globals.server.port);

    this.state.socket.on("new hands", (hands, nextToPlay, balader) => {
      this.setState({balader})
      const myCards = hands[this.state.position]
      for (let i=0; i<myCards.length; i++)
      {
        if (myCards[i].suit === this.state.suit)
          this.setState({cards: [...this.state.cards, myCards[i].rank] })
      }
      //console.log("Modified cards " + this.state.cards)
    })

    //this.socket.on("chat message", msg => {
      //this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    //});
  }

  playCard = (card) => {
    this.setState(prevState => ({cards: prevState.cards.filter(
      onecard => {
        //console.log(card === onecard)
        return card !== onecard
    } )}))
    this.state.socket.emit("played card", 
      {
        card: { rank: card, suit: this.state.suit },
        position: this.state.position,
      });
    console.log("Sent " + card+this.state.suit)
  }

  render() {
    this.buttons = this.state.cards.map(
      card => (
        <Button 
          key={card} 
          title={card} 
          disabled = {!this.props.enabled}
          onPress={(e) => this.playCard(card, e)} 
        />
    ));
    switch(this.state.suit) {
      case "S":
        this.buttons.unshift(
          <Icon name='cards-spade'
                type='material-community' 
                key="b"
                color="#000000" />)
        break;
      case "H":
        this.buttons.unshift(
          <Icon name='cards-heart'
                key="c"
                type='material-community' 
                color="#FF0000" />)
        break;
      case "D":
        this.buttons.unshift(
          <Icon name='cards-diamond'
                key="d"
                type='material-community' 
                color="#FF0000" />)
        break;
      case "C":
        this.buttons.unshift(
          <Icon name='cards-club'
                key="e"
                type='material-community' 
                color="#000000" />)
        break;
    }
    return(
      <View style={styles.xromaContainer}>
          {this.buttons}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  xromaContainer: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: "#F5FCFF",
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
    marginLeft:40,
    alignItems: 'center',
  },
})

