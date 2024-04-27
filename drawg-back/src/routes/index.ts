import { Router } from 'express'
import Redis from 'ioredis'
import { randomUUID } from 'crypto'
import { CreateLobby, Lobby } from '../types/types'

const router = Router()

const REDIS_HOST = process.env.REDIS_HOST

const redis = new Redis({
    host: REDIS_HOST
})

router.post('/lobby', async (req, res, next) => {
    try {
        const { username, nbPlayers }: CreateLobby = req.body
        const idLobby = randomUUID()
        let lobby = {
            id: idLobby,
            owner: username,
            players: [username],
            nbPlayers: nbPlayers
        }

        await redis.set(`lobby:${idLobby}`, JSON.stringify(lobby))
        res.send(lobby)

    } catch (err) {
        console.log(err)
        res.status(500)
    }
})


router.post('/lobby/:id/join', async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.body
        // Check if lobby exists
        const lobbyFound = await redis.get(`lobby:${id}`)
        console.log('lobby found')
        console.log(lobbyFound)
        if (!lobbyFound) return res.status(404).send('Lobby not exists')
        const lobby : Lobby = JSON.parse(lobbyFound)
        // Check if lobby is full
        if (lobby?.players.length === lobby?.nbPlayers) return res.status(400).send('The lobby is full')
        // Add the player to the lobby
        lobby?.players.push(username)
        console.log(lobby)
        await redis.set(`lobby:${id}`, JSON.stringify(lobby))
        res.send(lobby)

    } catch (err) {
        console.log(err)
        res.status(500)
    }
})


export default router