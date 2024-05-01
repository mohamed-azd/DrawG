import { Router } from 'express'
import Redis from 'ioredis'
import { randomUUID } from 'crypto'
import { CreateRoom, Room } from '../types/types'
import { io } from '../../app'

const router = Router()

const REDIS_HOST = process.env.REDIS_HOST

const redis = new Redis({
    host: REDIS_HOST
})

router.post('/room', async (req, res, next) => {
    try {
        const { username, nbPlayersMax }: CreateRoom = req.body
        const idRoom = randomUUID()
        let room = {
            id: idRoom,
            owner: username,
            players: [username],
            nbPlayersMax: nbPlayersMax
        }

        await redis.set(`room:${idRoom}`, JSON.stringify(room))
        res.send(room)

    } catch (err) {
        console.log(err)
        res.status(500)
    }
})


router.post('/room/:id/join', async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.body
        // Check if room exists
        const roomFound = await redis.get(`room:${id}`)
        if (!roomFound) return res.status(404).send('Room not exists')
        const room : Room = JSON.parse(roomFound)
        // Check if room is full
        if (room?.players.length === room?.nbPlayersMax) return res.status(400).send('The room is full')
        // Check that the player is not already in room
        if (room?.players.includes(username)) return res.status(400).send('Player has already joined the room')
        // Add the player to the room
        room?.players.push(username)
        await redis.set(`room:${id}`, JSON.stringify(room))
        // Emit a socket event
        io.to(`room:${id}`).emit('playerJoined', { room: room, newPlayer: username})
        res.send(room)

    } catch (err) {
        console.log(err)
        res.status(500)
    }
})


export default router