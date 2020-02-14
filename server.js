const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

let clients = {}

let groups = {}

saveClient = (username, client) => {
  clients[username] = {
    client: client,
    who: 'everyone'
  }
}

wss.on('connection', client => {

  client.on('message', message => {
    const parsedMSG = JSON.parse(message)
    saveClient(parsedMSG.username, client)

    if (parsedMSG.messageType === 'who' || parsedMSG.messageType==='message') {
      if (parsedMSG.who === 'everyone') {
        const username = parsedMSG.username
        console.log(username)
        const toSendTo = Object.keys(clients).filter(client => client !== username).client
        console.log(toSendTo)
        for (let i = 0; i < toSendTo.length; i++) {
          // console.log(clients[toSendTo[i]], parsedMSG.message)
          clients[toSendTo[i]].send(parsedMSG.message)
        }
      } 
    }
  })
})
