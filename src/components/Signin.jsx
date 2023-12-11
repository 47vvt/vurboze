import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export default function Signin() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function signIn() {
        // e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function signUp() {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    async function signInGoogle() {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }
    
    
    return (
        <>
            
        <button className="btn" onClick={()=>document.getElementById('login_modal').showModal()}>login</button>
        <dialog id="login_modal" className="modal">
            <div className="modal-box">

                <h3 className="font-bold text-lg">login/signup</h3>
                <p className="py-4">sign in to autosave your pieces</p>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPassword(e.target.value)} /
                    >
                <button className="btn" onClick={signIn}>sign in</button>
                <button className="btn" onClick={signUp}>sign up</button>
                <button className="btn" onClick={signInGoogle}>sign in w/google</button>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
        </>
    )
}