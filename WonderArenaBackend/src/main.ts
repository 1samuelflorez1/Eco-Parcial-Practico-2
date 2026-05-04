import express, { Request, Response } from "express"
import { createServer, Server } from "http"
import cors from "cors"
import "dotenv/config"
import socketio from "socket.io"

import { AuthRouter } from "./routes/auth/auth.router"
import { GameRouter } from "./routes/game/game.router"
import { disconnect } from "cluster"
import { removePlayer } from "./game/arena"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", AuthRouter)
app.use("/game", GameRouter)

app.get("/", (_req: Request, res: Response) => {
    res.send("WonderArena Backend")
})

const rawServer = createServer(app)

rawServer.listen(8080, () => {
    console.log("Server running on port 8080")
})

const io = new socketio.Server(rawServer, {
    path: "/real-time",
    cors: {
        origin: "*"
    }
})

const players: Record<string, { id: string, dx: number, dy: number, x: number, y: number}> = {};

io.on("connection", (socket) => {
    console.log("client connected", socket.id)

    socket.emit("Welcome to the Game");

    players[socket.id] = {id: socket.id}
    io.emit("player-move", JSON.stringify({posicionX: players.dx, posicionY: players.dy}))
    io.emit("game-Update", JSON.stringify({players: [players.id, players.x, players.y]}))
    io.emit("player-eliminated", JSON.stringify(socket.id))
    io.emit("game-over", JSON.stringify({winner: socket.id}))

    if(!players){
        removePlayer(socket.id)
        disconnect()
    }
});
