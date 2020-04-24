const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;
const fetch = require('node-fetch');

server.listen(port, () => console.log("server running on port:" + port));

let tableReady = false
let nextOpen = 0
let table = ["Babot0","Babot1","Babot2","Babot3"]
let bids = [-1,-1,-1,-1]
let onLead = Math.floor(Math.random() * 4); 
let babot = []
let testing = false
let balader
let currentBaza = []
let bazes = []

io.on("connection", socket => {
  console.log("a user connected :D" + socket.id);
  socket.on("new player", (msg, ack) => {
    console.log('New player nickname: ' + msg.nickname);
    if (msg.nickname === "Test") {
      babot.push(new Babot("Babot0", 0))
      babot.push(new Babot("Babot1", 1))
      babot.push(new Babot("Babot2", 2))
      babot.push(new Babot("Babot3", 3))
      nextOpen = 4
      testing = true
      table[0] = "Kanados"
      ack(table,0)
    }
    if (nextOpen < 4) 
    { 
      table[nextOpen]=msg.nickname
      nextOpen++
      console.log("Tbl size now is " + nextOpen)
      console.log("Table now is " + table)
      ack(table,nextOpen-1)
      io.emit("new table setup", table)
    }
    if (nextOpen === 4)
    {
      f = 2
      let hands = getHands(f)
      balader = getBalader(f)
      console.log("Sending hand")
      console.log(onLead)
      console.log(balader.suit+balader.rank)
      io.emit("new hands", hands, onLead, balader)
      console.log(bids)
      if (testing)
        for (let i=1; i<4; i++)
        {
          babot[i].newHand(hands[i])
          bids[i] = babot[i].bid()
        }
        console.log(bids)
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
  socket.on("played card", msg => {
    console.log("Played Card " + msg.card.rank + msg.card.suit + " by " + msg.position);
    io.emit("played card", msg);
    currentBaza.push(msg.card)
    if (testing)
    {
      getAfterPlays(onLead,balader)//Ask for play from babot
    }
    if (currentBaza.length === 4) {
      determineBazaWinner(currentBaza)
      onLead = currentBaza[4]
      console.log("Baza winner " + onLead)
      bazes.push(currentBaza)
      currentBaza = []
      io.emit("baza result", onLead)
    }
    if (bazes.length > 12)
    {
      // End of gyra
    }
  });
  socket.on("bid", msg => {
    console.log("Received bid " + msg.bazes + " by " + msg.position);
    bids[msg.position] = msg.bazes
    console.log("Bids: ", bids)
    if (allBidsIn(bids)) {
      io.emit("all bids", bids);
      if (testing)
      {
        getBeforePlays(onLead,balader)//Ask for play from babot
      }
    }
  });
});

getAfterPlays = (next, balader) => {
  if (next === 1) return
  //let lead = babot[next].getLead()
  //io.emit("played card",
      //{
        //card: lead,
        //position: next,
      //})
  //bazes[bazaNumber][cardsInBaza]=lead
  //cardsInBaza++
  for (let i=1; i<next;i++)
  {
    follow = babot[i].getFollow(currentBaza[0], balader)
    io.emit("played card", 
      {
        card: follow,
        position: i,
      })
  currentBaza.push(follow)
  }
}

getBeforePlays = (next, balader) => {
  if (next === 0) return
  let lead = babot[next].getLead()
  io.emit("played card",
      {
        card: lead,
        position: next,
      })
  currentBaza.push(lead)
  for (let i=next+1; i<4;i++)
  {
    follow = babot[i].getFollow(lead, balader)
    io.emit("played card", 
      {
        card: follow,
        position: i,
      })
  currentBaza.push(follow)
  }
}

allBidsIn = bids => {
  let res = true
  for (let i=0; i < bids.length ; i++) res = res && bids[i]>-1
  return res
}
 
getBalader = (size) => {
  if (size === 13) return {rank:" ", suit: " "}
  return {rank:"5", suit: "D"}
}

getHands = (size) => {
  return(
    [
    [ {rank:"K", suit: "S"}, {rank:"Q", suit: "S"} ],
    [ {rank:"3", suit: "H"}, {rank:"4", suit: "H"} ],
    [ {rank:"3", suit: "D"}, {rank:"4", suit: "D"} ],
    [ {rank:"3", suit: "C"}, {rank:"4", suit: "C"} ],
    ]
  )
}

async function getFourHands(fylla) 
{
  let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  let data = await response.json();
  let deck_id = data.deck_id;
  let hands = []
  for (let i = 0; i< 4; i++)
  {
    response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${fylla}`);
    hands[i] = await response.json();
  }
  return hands;
}

/*
getFourHands(3)
  .then(data => {

  for (let i = 0; i< 4; i++)
  {  console.log(data[i].cards[1].images)
  }

}); 

*/
/*
// Get a deck

let deck_id = ""

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", 
      { method: 'GET' })
.then((response) => response.json())
//Success 
.then((data) => { 
  deck_id = data.deck_id 
  console.log(deck_id)
fetch("https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=13", 
      { method: 'GET' })
.then((response) => response.json())
//Success 
.then((data) => { 
  console.log(data.deck_id)
//    deck_id = data.deck_id 
    })
//    //Error 
    .catch((error) => { console.error(error) })
})
//Error 
.catch((error) => { console.error(error) })

*/

function Babot(name, position) {
  this.name = name;
  this.position = position;
  this.hand = [];
  this.newHand = (hand) => {this.hand = hand}
  this.bid = () => {return Math.floor(this.hand.length / 4)}
  this.getLead = () => {
    res = this.hand[0]
    this.hand.shift()
    return res
  }
  this.getFollow = (lead, balader) => {
    result = this.hand[0]
    res = -1
    for (let i=0; i<this.hand.length ; i++)
    {
      if (lead.suit === this.hand[i].suit) {
        res = i
        break
      }
    }
    if (res > -1) {
      result = this.hand[res]
      this.hand.splice(res,1)
    } else {
      for (let i=0; i<this.hand.length ; i++)
      {
        if (balader.suit === this.hand[i].suit) {
          res = i
          break
        }
      }
      if (res > -1) {
        result = this.hand[res]
        this.hand.splice(res,1)
      } else {
        result = this.hand[0]
        this.hand.shift()
      }
    }
    return result
  }
}

