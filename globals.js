import {StyleSheet, Dimensions} from 'react-native'
import io from "socket.io-client";

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  primary: '#226B74',
  secondary: '#254B5A',
  tsoxa: '#35654D'
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
}

export const server = {
  //url: "http://10.0.1.58",
  url: "http://10.0.1.123",
  port: 3000,
}
