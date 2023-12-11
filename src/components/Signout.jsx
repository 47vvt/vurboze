import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

export default function Signout() {
    async function logout() {
        try {
            await signOut(auth)
            console.log("successfully logged out")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button className="btn" onClick={logout}>logout</button>
    )
}