"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioredis_1 = __importDefault(require("ioredis"));
const crypto_1 = require("crypto");
const app_1 = require("../../app");
const router = (0, express_1.Router)();
const REDIS_HOST = process.env.REDIS_HOST;
const redis = new ioredis_1.default({
    host: REDIS_HOST
});
router.post('/lobby', async (req, res, next) => {
    try {
        const { username, nbPlayers } = req.body;
        const idLobby = (0, crypto_1.randomUUID)();
        let lobby = {
            id: idLobby,
            owner: username,
            players: [username],
            nbPlayers: nbPlayers
        };
        await redis.set(`lobby:${idLobby}`, JSON.stringify(lobby));
        res.send(lobby);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});
router.post('/lobby/:id/join', async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        // Check if lobby exists
        const lobbyFound = await redis.get(`lobby:${id}`);
        if (!lobbyFound)
            return res.status(404).send('Lobby not exists');
        const lobby = JSON.parse(lobbyFound);
        // Check if lobby is full
        if (lobby?.players.length === lobby?.nbPlayers)
            return res.status(400).send('The lobby is full');
        // Check that the player is not already in lobby
        if (lobby?.players.includes(username))
            return res.status(400).send('Player has already joined the lobby');
        // Add the player to the lobby
        lobby?.players.push(username);
        await redis.set(`lobby:${id}`, JSON.stringify(lobby));
        // Emit a socket event
        app_1.io.to(`lobby:${id}`).emit('playerJoined', { username });
        res.send(lobby);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});
exports.default = router;
