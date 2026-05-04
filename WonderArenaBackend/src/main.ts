import express, { Request, Response } from "express"
import { createServer, Server } from "http"
import cors from "cors"
import "dotenv/config"
import socketio from "socket.io"

import { AuthRouter } from "./routes/auth/auth.router"
import { GameRouter } from "./routes/game/game.router"

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

const io = new socketio.Server({
    path: "/real-time",
    cors: {
        
    }
})
