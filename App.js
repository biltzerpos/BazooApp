import React, { Component } from "react";
import { Button, TextInput, StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'
import Tsoxa from './Tsoxa.js'
import Tsat from './Tsat.js'
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io(globals.server.url + ":" + globals.server.port);
    this.state = {
      socket: this.socket,
      showEntryForm: true,
      nickname: "",
      position: -1,
      playerNames: []
    }
  }

  componentDidMount() {
  }

  handleNameChange = nickname => {
    this.setState({nickname})
  }

  setPosition = (pos) => { 
    this.setState( {position: pos })
    console.log("Position set to " + pos)
  }

  sendNewPlayer() {
    return new Promise((resolve, reject) => {
      console.log("Sending new player request");
      this.state.socket.emit("new player",
      {
        nickname: this.state.nickname,
      }, (table, pos) => {
        this.setState( { playerNames: table, position: pos })
        console.log("Position set to " + pos)
        console.log("Playernames are " + table)
        console.log("Playernames are " + this.state.playerNames)
        resolve(pos,table)
        }
      )
        //socket.emit('message', 'test', function(response) {
            //console.log("client got ack response", response);
            //resolve(response);
        //});
      })
  }

  handleSubmit = () => {
    this.sendNewPlayer().then((pos,table) => {
    console.log("Sent new player " + this.state.nickname)
    //this.state.socket.on("new player arrival", msg => {
      //console.log("NPA " + msg.nickname + " " + msg.position)
      //if (msg.nickname === this.state.nickname)
         //this.setState({ position: msg.position })
    //})
    //while (this.state.position === -1) {}
    console.log("Receiver position " + pos)
    console.log("State position " + this.state.position)
    console.log("Table is now: " + table)
    this.setState( { showEntryForm: false } )
  })
  }

  render() {
    if (this.state.showEntryForm) {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.nickname}
          onChangeText={this.handleNameChange}
          placeholder="Ψευδώνυμο"
        />
        <Button 
          title="Πάμε για μπαζού!" 
          onPress={this.handleSubmit} 
          disabled={this.state.nickname.length < 1} 
        />
      </View>
    )} else {
    return (
      <View style={styles.mainView}>
        <Tsoxa 
           playerNames = {this.state.playerNames}
           position = {this.state.position}
           socket = {this.socket}/>
        <Tsat 
           nickname = {this.state.nickname}
           socket = {this.socket}/>
      </View>
    );}
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

