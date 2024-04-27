"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routes/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
app.get('', (req, res) => res.send("salut"));
app.listen(3000, () => {
    console.log("Draw G back launched");
});
