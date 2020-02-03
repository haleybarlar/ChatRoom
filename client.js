const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
const prompt = require('prompt-sync')({sigint: true})

let close = false

connection.onmessage = (e) => {
    console.log(e.data)
    let message = prompt('whats your message')
    connection.send(JSON.stringify({
        message: message,
        username: "haley"
    }))

    if (message === "stop") {
        close = true
    }

}

connection.onopen = () => {
    // while (!close) {
        let message = prompt('whats your message')
        connection.send(JSON.stringify({
            message: message,
            username: "haley"
        }))

        if (message === "stop") {
            close = true
        }
    // }
}

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}