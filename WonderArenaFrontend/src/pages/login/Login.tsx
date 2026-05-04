import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../consts/api"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        await fetch(`${import.meta.env.SUPABASE_URL}/auth/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                })
                navigate("/login")
    }

    return (
        <section>
            <h1>🏟 WonderArena</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Ingresar</button>
            <p>No tienes cuenta? <a href="/signup">Registrate</a></p>
        </section>
    )
}
