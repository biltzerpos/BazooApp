import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      pontoi: 0,
      //dilomenes: 0,
      kerdismenes: 0,
      playing: true,
      socket: props.socket,
    };
  }

  componentDidMount() {
    //this.socket = io("http://10.0.1.58:3000");
    //    this.socket = io(globals.server.url + ":" +
    //    globals.server.port);
    //
    //this.socket.on("chat message", msg => {
      //this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    //});
  }

  playCard = (card) => {
    //this.setState(prevState => ({spades: ["4", "3", "2"]}))
    //console.log(this.state)
    //this.updateXeri();
  }

/*  render() {
    return(
      //<View>
      <View style={styles.playerContainer}>
          //<Text style={styles.nameText}>{this.state.name}</Text>
          //<Text>{this.state.name}</Text>
          //<Text>{this.state.name}</Text>
      <Button title="adfgh" />
      </View>
    )
  }
*/

  render() {
    return(
      <View style={styles.playerContainer}>
        <Text>{this.state.name}</Text>
        <Text>Πόντοι: {this.state.pontoi}</Text>
        {this.state.playing && <Text>Δηλωμένες: {this.props.dilomenes}</Text>}
        {this.state.playing && <Text>Μπάζες: {this.state.kerdismenes}</Text>}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    width: globals.dimensions.fullWidth / 3,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    //marginRight:40,
    //marginLeft:40,
    //marginTop:10,
    //paddingTop:20,
    //paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#F5FCFF',
    //paddingTop: Constants.statusBarHeight,
  },
  nameText: {
    fontWeight: 'bold',
    color: '#000000',
  },
})

