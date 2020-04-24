export default function Babot(name, position, hands) {
  this.name = name;
  this.position = position;
  this.hand = hand;
  this.eyeColor = eyecolor;
  this.newHand = (hand) => {this.hand = hand}
  this.bid = () => {return Math.floor(hand.length / 4)}
}

