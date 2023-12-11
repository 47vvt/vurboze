
import BottomBar from "../components/BottomBar"
import Signin from "../components/Signin"
import Signout from "../components/Signout"
import Tiptap from "../components/Tiptap"
import ConfigureSession from "./ConfigureSession"
import Sidebar from "../components/Sidebar"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { useState, useEffect } from "react"
import { about } from "../config/vurboze"

import "../App.css"

function SavingIcon({savePending}) {
    if (savePending) {
        return (
            <span className="loading loading-spinner loading-md"></span>
        )}
    else {
        return null
    }
}

function ThemeSwitch() {
    return (
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn">
    theme
    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="light" value="pastel"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="spotify" value="forest"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="gray" value="dracula"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="retro" value="retro"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="valentine" value="valentine"/></li>
  </ul>
</div>
    )
}

function Header({title, ddmmyyyy}) {
    return (
        <>
        <div className="flex flex-col pt-10 max-w-3xl mx-auto text-center">

            <h1 className="h-preload"><b>{title}</b></h1>

            <div className="py-10">
                <p className="d-preload">{ddmmyyyy}</p>
            </div>
        </div>
        {/* <hr className="flex mx-auto max-w-xl opacity-50"/> */}
                    {/* <div class="flex justify-center">
                        <button className="btn btn-sm font-sans w-10">Ag</button>
                        <div className="px-3"><button className="btn btn-sm font-serif w-10">Ag</button></div>
                        <button className="btn btn-sm font-mono w-10">Ag</button>
                    </div> */}
        </>
    )
}

function vurboze(setVurbozeReminder, setFeedbackMode, uid, setSessionDetails) {
    if (!uid) {
        setVurbozeReminder("login first !!!")
    }
    else {
        const updatedSessionObj = {
            title : "how to use vurboze.",
            secsChosen : false,
            minsChosen : false,
            barOff : true
        }
        setFeedbackMode(about)
        setSessionDetails(updatedSessionObj)
    }
}


export default function Session() {
    const [uid, setUid] = useState("");
    const [sessionDetails, setSessionDetails] = useState(null)
    
    const [savePending, setSavePending] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [pieceType, setPieceType] = useState("text response")

    const [feedbackMode, setFeedbackMode] = useState(null)

    const [vurbozeReminder, setVurbozeReminder] = useState("click me (!?)")

    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid)
        } else {
          setUid("")
        }
      });
      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    }, [])

    function stopSession() {
        setSessionDetails(null)
        setFeedbackMode(null)
    }

    
    // get the date for date entry
    let today = new Date();
    let ddmmyyyy = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();

    return (
    <div className="relative">
        <div className="navbar bg-base-100 navbar-start preload">
            <a className="btn btn-ghost text-xl" onClick={() => vurboze(setVurbozeReminder, setFeedbackMode, uid, setSessionDetails)}>vurboze</a>
            <p className="absolute top-10 left-6 text-sm opacity-30">{vurbozeReminder}</p>
            <div className="absolute left-3 top-2.5">
            <div className="flex flex-col">
            <a className="btn btn-ghost text-xl opacity-0" onClick={() => vurboze(setVurbozeReminder, setFeedbackMode, uid, setSessionDetails)}>vurboze</a>
            </div>
            
            <div className="pl-2 pr-6">
                <ThemeSwitch className="pl-5"/>
            </div>
                {sessionDetails ? (
                <button 
                        className="btn" 
                        onClick={stopSession}
                        >stop session
                    </button>
                ):(
                    <ConfigureSession setSessionDetails={setSessionDetails} setPieceType={setPieceType}/>
                )}
            
                
            </div>

            
            {uid ? (
                // render if user is logged in 
                <>
                <div className="absolute top-2.5 right-5">
                    <div className="px-5">
                        <Signout/>
                    </div>
                    <div className="">
                        <Sidebar 
                            uid={uid} 
                            setSessionDetails={setSessionDetails} 
                            setPieceType={setPieceType}
                            setFeedbackMode={setFeedbackMode}
                        />
                    </div>
                </div>
                <div className="fixed top-2.5 right-5">
                    <SavingIcon savePending={savePending}/>
                    <div className="px-5 opacity-0">
                        <Signout/>
                    </div>
                    <div className="opacity-0">
                        <Sidebar/>
                    </div>
                </div>

                </>

            ):(
                // render if user is logged out
                <div className="fixed top-3 right-5">
                    <Signin/>
                </div>
            )}
            
        </div>
            {sessionDetails ? (
                // render if session has been configured
                <>
                    <Header title={sessionDetails.title} ddmmyyyy={ddmmyyyy}/>
                    <BottomBar 
                        initSec={sessionDetails.secsChosen} 
                        initMin={sessionDetails.minsChosen}
                        wordCount={wordCount}
                        setWordCount={setWordCount}
                        barOff={sessionDetails.barOff}
                    />
                    
                </>
            ):(
                // render if session not started/configured yet
                <>
                    <Header title={"untitled."} ddmmyyyy={ddmmyyyy}/>
                </>
            )} 
        <article className="prose max-w-2xl mx-auto preload">
            {uid ? (
                // render if user is logged in 
                <>
                <Tiptap 
                    trackChanges={sessionDetails ? true : false} 
                    uid={uid} 
                    title={sessionDetails ? sessionDetails.title : "untitled."}
                    ddmmyyyy={ddmmyyyy}
                    timechosen={sessionDetails ? 
                        `${sessionDetails.minsChosen}:${sessionDetails.secsChosen}`
                        : false}
                    setSavePending={setSavePending}
                    setWordCount={setWordCount}
                    pieceType={pieceType}
                    feedbackMode={feedbackMode}
                />
                </>

            ):(
                // render if user is logged out
                <>
                <Tiptap 
                    trackChanges={false} 
                    ddmmyyyy={ddmmyyyy} 
                    setWordCount={setWordCount}
                />
                </>
            )}
        </article>
    </div>
    )
}