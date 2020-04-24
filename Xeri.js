import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'
import io from "socket.io-client";
import Xroma from './Xroma.js'

export default class Xeri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //spades: props.spades,
      //hearts: props.hearts,
      //diamonds: props.diamonds,
      //clubs: props.clubs,
      socket: props.socket,
      position: props.position,
    };
    //console.log("xcv" + this.state.spades);
  }

  componentDidMount() {
    //this.socket = io("http://10.0.1.58:3000");
    //    this.socket = io(globals.server.url + ":" +
    //    globals.server.port);
    //
/*    this.state.socket.on("new hand", hands => {
      console.log ("Xeri received")
      const myCards = hands[this.state.position]
      console.log(this.state.spades)
      for (let i=0; i<myCards.length; i++)
      {
        //console.log(myCards[0].ra
        if (myCards[i].suit === "S")
          this.setState({spades: [...this.state.spades, myCards[i].rank] })
        if (myCards[i].suit === "H")
          this.setState({hearts: [...this.state.hearts, myCards[i].rank] })
        if (myCards[i].suit === "D")
          this.setState({diamonds: [...this.state.diamonds, myCards[i].rank] })
        if (myCards[i].suit === "C")
          this.setState({clubs: [...this.state.clubs, myCards.rank[i]] })
      }
      console.log(this.state.spades)
    })
 */ }
  

  playCard = (card) => {
    //this.setState(prevState => ({spades: ["4", "3", "2"]}))
    //console.log(this.state)
    //this.updateXeri();
  }

  render() {
    let on = (this.state.position === this.props.nextToPlay)
    return(
      <View style={styles.xeriContainer}>
          <Xroma 
            key={"S"} 
            suit={"S"} 
            cards={this.props.spades} 
            position={this.state.position}
            enabled={on}
            socket={this.state.socket}
          />
          <Xroma 
            key={"H"} 
            suit={"H"} 
            cards={this.props.hearts} 
            position={this.state.position}
            enabled={on}
            socket={this.state.socket}
          />
          <Xroma 
            key={"D"} 
            suit={"D"} 
            cards={this.props.diamonds} 
            position={this.state.position}
            enabled={on}
            socket={this.state.socket}
          />
          <Xroma 
            key={"C"} 
            suit={"C"} 
            cards={this.props.clubs} 
            position={this.state.position}
            enabled={on}
            socket={this.state.socket}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  xeriContainer: {
    flex: 2,
    //width: globals.dimensions.fullWidth / 2,
    justifyContent: 'space-evenly',
    //alignSelf: 'center',
    marginRight:4,
    marginLeft:4,
    marginTop:4,
    paddingTop:2,
    paddingBottom:2,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
    //backgroundColor: "#F5FCFF",
    //paddingTop: Constants.statusBarHeight,
  },
})

