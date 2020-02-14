const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
const prompt = require('prompt-sync')({sigint: true})

let getUser = prompt('whats your username')

connection.onmessage = (e) => {
    console.log(e.data)
    let message = prompt('whats your message')
    connection.send(JSON.stringify({
        message: message,
        messageType: 'message',
        username: getUser
    }))
}

// what we need to do is change the payload( what's in stringify ) and add message type to it

connection.onopen = () => {
    connection.send(JSON.stringify({
        username: getUser
    }))

    let getPersonMessage = prompt('Who do you want to talk to?')
    
    if (getPersonMessage.toLowerCase() === 'everyone') {
        connection.send(JSON.stringify({
            who: 'everyone',
            messageType: 'who',
            username: getUser
        }))
    } else if (getPersonMessage.toLowerCase() === 'group') {
        whichGroup = prompt('which group')
        connection.send(JSON.stringify({
            group: whichGroup,
            messageType: 'who',
            username: getUser
        }))
    } else {
        whichPerson = prompt('who to talk to')
        connection.send(JSON.stringify({
            username: whichPerson,
            messageType: 'who',
            username: getUser
        }))
    }
}

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}