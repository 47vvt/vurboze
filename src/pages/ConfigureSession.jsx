import { useState } from "react"

export default function ConfigureSession({ setSessionDetails, setPieceType }) {

    // states for all session parameters
    const [minsChosen, setMinsChosen] = useState(10)
    const [secsChosen, setSecsChosen] = useState("0")
    const [title, setTitle] = useState("")

    ////////////////////////////
    /// HANDLE TIMER SETTING ///
    ////////////////////////////
    const [checked, setChecked] = useState(false)
    function Untimed() {
        if (checked == true) {
            setChecked(false)
        }
        else {
            setChecked(true)
        }
    }
    function handleMins(e) {
        let mins = parseInt(e.target.value, 10)
        if (e.target.value == "0") {
            setSecsChosen(e.target.value)
        }
        else if (mins <= 90 && 0 < mins) {
            setMinsChosen(mins)
        }
        else {
            setMinsChosen(0)
        }
    }
    function handleSecs(e) {
        let secs = parseInt(e.target.value, 10)
        if (e.target.value == "0") {
            setSecsChosen(e.target.value)
        }
        else if (secs < 60 && 0 < secs) {
            setSecsChosen(secs)
        }
        else {
            setSecsChosen(0)
        }
    }


    ////////////////////////////////
    /// PASS ALL THE DATA TO OBJ ///
    ////////////////////////////////
    function startSession(e) {
        e.preventDefault()

        // sessionDetails is a parent state variable (in Session.jsx)
        setSessionDetails({
            minsChosen : checked ? false : minsChosen,
            secsChosen : checked ? false : secsChosen,
            title : title,
            barOff : false,
        })
    }

    return (
        <>
            
        <button 
            className="btn" 
            onClick={()=>document.getElementById('session_config').showModal()}
            >session
        </button>
        <dialog id="session_config" className="modal">
            <div className="modal-box">

                <h3 className="font-bold text-lg pb-5">start a writing session</h3>

                {/* choose heading */}
                <input 
                    type="text" 
                    placeholder="title" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={(e) => setTitle(e.target.value)}/>
                
                {/* choose piece type */}
                <select 
                    className="select select-bordered w-full max-w-xs" 
                    onChange={(e) => setPieceType(e.target.value)}
                >   
                    <option>text response</option>
                    <option>creative</option>
                    <option>oral (scripting)</option>
                    <option>argument analysis</option>
                </select>

                {/* insert custom time */}
                <div className="flex">
                    <input 
                        type="number" 
                        placeholder="mins (default 10)" 
                        className={`input input-bordered w-full max-w-xs ${minsChosen ? "" : "input-error"}`}
                        onChange={handleMins}
                        disabled={checked}/>
                    <input 
                        type="number" 
                        placeholder="secs" 
                        className={`input input-bordered w-full max-w-xs ${secsChosen ? "" : "input-error"}`} 
                        onChange={handleSecs}
                        disabled={checked}/>
                </div>
                
                {/* untimed checkbox */}
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Untimed</span> 
                    <input type="checkbox" defaultChecked={checked} onClick={Untimed} className="checkbox" />
                </label>
                </div>

                {/* start session */}
                <div className="modal-action">
                    <form method="dialog">
                        <button 
                            className="btn" 
                            onClick={startSession} 
                            disabled={((!minsChosen || !secsChosen) && !checked) || !title}
                            
                        >Start</button>
                    </form>
                </div>

            </div>
        </dialog>
        </>
    )
}