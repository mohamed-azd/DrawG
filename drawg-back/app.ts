import express from 'express'
import routes from './src/routes/index'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

const server = app.listen(3000, () => {
    console.log("Draw G back launched")
});

export const io = new Server(server) 

io.on('connection', (socket) => {
    console.log('socket io connected')

    socket.on('playerJoined', (lobbyId) => {
        socket.join(`lobby:${lobbyId}`)
        console.log(`lobby:${lobbyId}`)
    })
})

