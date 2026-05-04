import { createContext, useContext, useState } from "react"

interface AuthContextType {
    accessToken: string | null
    login: (tokens: { accessToken: string }) => void
}

const AuthContext = createContext<AuthContextType>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    )

    const login = (tokens: { accessToken: string }) => {
        localStorage.setItem("accessToken", tokens.accessToken)
    }

    return (
        <AuthContext.Provider value={{ accessToken, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
