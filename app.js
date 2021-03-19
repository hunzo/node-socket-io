const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('user connected..')
    socket.on('disconnect', () => {
        console.log('disconect')
    })

    socket.on('chat message', (msg) => {
        console.log('username: ' + msg.username)
        console.log('message: ' + msg.message)
        console.log('------------------------------------')

        io.emit('chat message', msg)
    })


})



http.listen(process.env.PORT || 3000 )