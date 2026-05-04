import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Game } from "../pages/game/Game"
import { useAuth } from "../contexts/AuthProvider"

export const MainRouter = () => {
    const accessToken = useAuth()

    return (
        <Routes>
            <Route path="/login"  element={accessToken ? <Game/> : <Navigate to="/login"/>} />
            <Route path="/signup" element={accessToken ? <Game/> : <Navigate to="/signup"/>} />
            <Route path="/game"   element={accessToken ? <Game/> : <Navigate to="/game"/>} />
            <Route path="*"       element={<Navigate to="/login" />} />
        </Routes>
    )
}
