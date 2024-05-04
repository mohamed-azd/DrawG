import { Router } from 'express'
import { randomUUID } from 'crypto'
import { CreateRoom, RoomFromRedis } from '../types/types'
import { io } from '../../app'
import { redis } from '../../app'
import Player from '../classes/Player'
import Room from '../classes/Room'
import { getRandomWords } from '../utils/utils'

const router = Router()



router.post('/room', async (req, res) => {
    try {
        const { username, nbPlayersMax }: CreateRoom = req.body
        const idRoom = randomUUID()
        const player = new Player(username)
        const room = new Room(idRoom, player, [player], nbPlayersMax)
        await redis.set(`room:${idRoom}`, JSON.stringify(room.getData()))
        res.send(room.getData())
    } catch (err) {
        res.status(500)
    }
})


router.post('/room/:id/join', async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.body
        // Check if room exists
        let result = await redis.get(`room:${id}`)
        if (!result) return res.status(404).send('Room not exists')
        // Get room infos
        const roomFromRedis: RoomFromRedis = JSON.parse(result)
        const players = roomFromRedis.players.map((playerFromRedis) => new Player(playerFromRedis.username, playerFromRedis.hasDrawn))
        const owner = new Player(roomFromRedis.owner.username, roomFromRedis.owner.hasDrawn)
        const room = new Room(roomFromRedis.id, owner, players, roomFromRedis.nbPlayersMax)
        // Check room is not currently playing
        if (room.isCurrentlyPlaying()) res.status(400).send('The room is currently playing, retry later')
        // Check if room is full
        if (room.isFull()) return res.status(400).send('The room is full')
        // Check that the player is not already in room
        if (room.getPlayerByUsername(username)) return res.status(400).send('Player has already joined the room')
        // Add the player to the room
        const newPlayer = new Player(username)
        room.addPlayer(newPlayer)
        await redis.set(`room:${id}`, JSON.stringify(room.getData()))
        // Emit a socket event
        io.to(`room:${id}`).emit('playerJoined', { room: room.getData(), newPlayer: newPlayer.getData() })
        res.send(room.getData())
    } catch (err) {
        res.status(500).send()
    }
})


router.post('/room/:id/start', async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.body
        const result = await redis.get(`room:${id}`)
        if (!result) return res.status(404).send('Room not exists')
        // Get room infos
        const roomFound: RoomFromRedis = JSON.parse(result)
        if (roomFound.owner.username !== username) res.status(401).send(`Player ${username} is not allowed to start the game`)
        const players = roomFound.players.map((player) => new Player(player.username, player.hasDrawn))
        const owner = players.find((player) => player.getUsername() === roomFound.owner.username) ?? new Player(roomFound.owner.username, roomFound.owner.hasDrawn)
        const room = new Room(id, owner, players, roomFound.nbPlayersMax, roomFound.isPlaying)
        // Define a drawer
        const drawer = room.defineDrawer()
        if (!drawer) res.status(500).send('No drawer found')
        // Store new infos in redis
        room.setIsPlaying(true)
        await redis.set(`room:${id}`, JSON.stringify(room.getData()))
        io.to(`room:${id}`).emit('gameStarted', { room: room.getData(), drawer: drawer?.getData(), words: getRandomWords(3) })
        res.send('ok')
    } catch (err) {
        res.status(500).send()
    }
})


export default router