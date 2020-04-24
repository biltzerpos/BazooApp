import React from 'react'
import {Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'
import Xeri from './Xeri.js'
import Player from './Player.js'
import Trapezi from './Trapezi.js'
import Bidder from './Bidder.js'
import Balader from './Balader.js'

export default class Tsoxa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      position: props.position,
      playerNames: props.playerNames,
      topPlayer: (props.position + 2) %4,
      leftPlayer: (props.position + 3) %4,
      rightPlayer: (props.position + 1) %4,
      spades: [],
      hearts: [],
      diamonds: [],
      clubs: [],
      bidding: true,
      bids:[],
      nextToPlay: -1,
      balader: " ",
      fylla: -1,
    }
    this.state.socket.on("all bids", (bids) => {
      console.log("all bids received")
      console.log(bids)
      this.setState({
        bids: bids,
        bidding: false,
      })
      console.log(this.state.playerNames)
    })
    this.state.socket.on("new table setup", (table) => {
      console.log("new table received")
      console.log(table)
      this.setState({
        playerNames: table,
      })
      console.log(this.state.playerNames)
    })
    this.state.socket.on("new hands", (hands, nextToPlay, balader) => {
      console.log("nextToPlay " + nextToPlay)
     
      this.setState( {nextToPlay, balader} )
      console.log(this.state.playerNames[nextToPlay] + " will play first")
      this.fylla = hands[0].length
    }) 
    this.state.socket.on("played card", msg => {
      cardPos = (msg.position - this.state.position + 4) % 4
      console.log("Tsoxa received " + msg.card.rank +
            msg.card.suit + " " + msg.position);
      this.setState({nextToPlay: (msg.position + 1) % 4})
    })
  }

  middleView = () =>
  {
    if (this.state.bidding) return(
          <Bidder 
            protos = {this.state.playerNames[this.state.nextToPlay]}
            fylla = {this.fylla}
            position={this.state.position}
            socket={this.state.socket}
          />
    )
    else return(
          <Trapezi cards={ [
            { rank: " ", suit: " " },
            { rank: " ", suit: " " },
            { rank: " ", suit: " " },
            { rank: " ", suit: " " },
            ] }
            position={this.state.position}
            socket={this.state.socket} 
          />
    )
  }

  render() {
    console.log(this.state.balader)
    return(
      <View style={styles.tsoxaContainer}>
        <View style={styles.topRow}>
          <Balader 
            balader={this.state.balader}
          />
          <Player 
            name={this.state.playerNames[this.state.topPlayer]}
            dilomenes = {this.state.bids[this.state.topPlayer]}
            socket={this.state.socket}
          />
          <Balader 
            balader={this.state.balader}
          />
        </View>
        <View style={styles.trapeziRow}>
          <Player 
            name={this.state.playerNames[this.state.leftPlayer]} 
            dilomenes = {this.state.bids[this.state.leftPlayer]}
            socket={this.state.socket}
          />
          {this.middleView()}
          <Player 
            name={this.state.playerNames[this.state.rightPlayer]} 
            dilomenes = {this.state.bids[this.state.rightPlayer]}
            socket={this.state.socket}
          />
        </View>
        <Xeri 
          nextToPlay={this.state.nextToPlay}
          spades={this.state.spades}
          hearts={this.state.hearts}
          diamonds={this.state.diamonds}
          clubs={this.state.clubs}
          socket={this.state.socket} 
          position= {this.state.position}
        />
      </View>
    )
  }

}

//Tsoxa.propTypes = {
  //name: PropTypes.string,
  //phone: PropTypes.string,
//}

const styles = StyleSheet.create({
  tsoxaContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    backgroundColor: globals.colors.tsoxa,
    //paddingTop: Constants.statusBarHeight,
  },
  trapeziRow: {
    flexDirection: 'row',
    backgroundColor: globals.colors.tsoxa,
    //paddingTop: Constants.statusBarHeight,
  },
  topRow: {
    flexDirection: 'row',
    backgroundColor: globals.colors.tsoxa,
    //paddingTop: Constants.statusBarHeight,
  },
})

