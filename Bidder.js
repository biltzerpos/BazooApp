import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Image, Dimensions } from 'react-native'
import * as globals from './globals.js'
import io from "socket.io-client";

export default class Bidder extends React.Component {
  constructor(props) {
    super(props);
    //this.defaultState = props.cards
    this.state = {
      dioxeria: false,
      socket: props.socket,
      position: props.position,
    };
  }

  bid = (number) => {
    this.state.socket.emit("bid",
      {
        bazes: number,
        position: this.state.position,
      });
  }

  buttonsFirstRow = () => {
    res = []
    let start = 0
    let end = 4
    if (this.state.dioxeria) {
      start = 6
      end = 10
    }
    for (let i=start; i<end; i++)
    {
      res.push(
        <Button key={i} title={i+""} 
        onPress={(e) => this.bid(i, e)} />
      )
    }
    return res
  }

  buttonsSecondRow = () => {
    res = []
    for (let i=4; i<6; i++)
    {
      res.push(
        <Button key={i} title={i+""} 
        onPress={(e) => this.bid(i, e)} />
      )
    }
      res.push(
        <Button key={7} title={"Δύο χέρια"} 
        onPress={() => this.setState( {dioxeria:  true})} />
      )
    
    return res
  }

  render() {
    return(
      <View style={styles.trapeziContainer}>
        <Text> Paizei protos: {this.props.protos} </Text>
        <Text> Poses diloneis? </Text>
        <View style={styles.buttons}>
          {this.buttonsFirstRow()}
        </View>
        <View style={styles.buttons}>
          {this.buttonsSecondRow()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trapeziContainer: {
    flex: 1,
    //flexGrow: 1,
    flexDirection: 'column',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //height: globals.dimensions.fullHeight *2 / 20,
    //alignSelf: 'center',
  },
  middleCards: {
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  cards: {
    //flexDirection: 'row',
  },
})

