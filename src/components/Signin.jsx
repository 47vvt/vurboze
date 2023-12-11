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
            <div className="modal-box flex flex-col max-w-xs">

                <h3 className="font-bold text-3xl">login/signup</h3>
                <p className="py-4">sign in to autosave your pieces</p>
                <hr className='opacity-25'/>
                <div className='py-3 mx-auto'>
                <button className="btn btn-wide" onClick={signInGoogle}>sign in w/google</button>
                </div>
                <hr className='opacity-25'/>
                <div className='pt-3'>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled="disabled"
                    />
                    
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled="disabled"
                    />
                <button className="btn" onClick={signIn} disabled="disabled">sign in</button>
                <button className="btn" onClick={signUp} disabled="disabled">sign up</button>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
                </div>
            </div>
        </dialog>
        </>
    )
}