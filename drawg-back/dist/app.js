"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routes/index"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
const server = app.listen(3000, () => {
    console.log("Draw G back launched");
});
exports.io = new socket_io_1.Server(server);
exports.io.on('connection', (socket) => {
    console.log('socket io connected');
    socket.on('playerJoined', (lobbyId) => {
        socket.join(`lobby:${lobbyId}`);
        console.log(`lobby:${lobbyId}`);
    });
});
