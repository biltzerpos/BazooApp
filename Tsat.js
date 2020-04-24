import React from 'react'
import {ScrollView, TextInput, Button,StyleSheet, Text, View} from 'react-native'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
import * as globals from './globals.js'
import io from "socket.io-client";

export default class Tsat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      socket: props.socket,
      nickname: props.nickname,
    };
  }

  componentDidMount() {
    //this.socket = io("http://10.0.1.58:3000");
    //console.log(globals.server.url + ":" + globals.server.port)
    //this.socket = io(globals.server.url + ":" + globals.server.port);
    this.state.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.state.socket.emit("chat message", this.state.nickname + ": " + this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return(
      <View style={styles.tsatContainer}>
        <ScrollView style={styles.messagesContainer}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
          this.scrollView.scrollToEnd({animated: true})}} >
          {chatMessages}
        </ScrollView>
        <TextInput style={styles.inputContainer}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tsatContainer: {
    flex: 1,
    //backgroundColor: "#F5FCFF",
    //paddingTop: Constants.statusBarHeight,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    //paddingTop: Constants.statusBarHeight,
  },
  inputContainer: {
    height: 40,
    borderWidth: 2,
    //paddingTop: Constants.statusBarHeight,
  },
})

