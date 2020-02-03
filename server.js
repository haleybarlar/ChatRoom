const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

let clients = {}

saveClient = (username, client) => {
  clients[username] = client
}

wss.on('connection', client => {
  client.on('message', message => {
    const parsedMSG = JSON.parse(message)
    saveClient(parsedMSG.username, client)
    const username = parsedMSG.username

    const toSendTo = Object.keys(clients).filter(user => user !== username)

    for (let i = 0; i < toSendTo.length; i++) {
      clients[toSendTo[i]].send(parsedMSG.message)
    }
  })
})

