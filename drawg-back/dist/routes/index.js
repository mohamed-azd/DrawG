"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioredis_1 = __importDefault(require("ioredis"));
const crypto_1 = require("crypto");
const router = (0, express_1.Router)();
const REDIS_HOST = process.env.REDIS_HOST;
const redis = new ioredis_1.default({
    host: REDIS_HOST
});
router.get('/lobby', async (req, res, next) => {
    try {
        const { username: string } = req.body;
        const idLobby = (0, crypto_1.randomUUID)();
        let lobby = {
            id: idLobby,
            owner: username,
            players: [username]
        };
        await redis.set(`lobby:${idLobby}`, lobby);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});
exports.default = router;
