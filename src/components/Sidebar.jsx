import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../config/firebase"


function Collapsibles({uid, setSessionDetails, setFeedbackMode }) {

    const [sortedPieces, setSortedPieces] = useState([{},{},{},{}])
    
    
    function handleHistoryClick(index, title){
        const updatedSessionObj = {
            title : title,
            secsChosen : false,
            minsChosen : false,
            barOff : true
        }
        // editor.commands.setContent(sortedPieces[index][title]['content'])
        setFeedbackMode(sortedPieces[index][title]['content'])
        setSessionDetails(updatedSessionObj)
    }
    
    const docRef = doc(db, "users", `${uid}`)

    async function ret(textType) {
        const docSnap = await getDoc(docRef)
        return docSnap.data()[textType] ?? {}
    }
    const types = ["text response", "creative", "argument analysis", "oral (scripting)"]
    
    useEffect(() => {
        async function getData() {
          try {
            const promises = types.map((type) => ret(type))
            const results = await Promise.all(promises)
            setSortedPieces(results)
          } catch (error) {
            console.error("Error fetching data:", error)
          }
        }
        getData()
      }, [])
    
    return (
    <>
    
    {types.map((type, index) => (
        <div key={index} className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium collapse-close">
                {type}
            </div>
                <div  className="collapse-content"> 
                    {Object.keys(sortedPieces[index]).map(title => (
                        <li key={title} onClick={() => handleHistoryClick(index, title)}><a>{title}</a></li>
                        // handleHistoryClick should pass index and title
                    ))}
                </div>
        </div>
    ))}

    </>
    )
}

// function SearchBar() {
//     return (
//         <div className="flex">
//             <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
//             <button className="btn btn-square btn-outline">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//         </div>
//     )
// }

export default function Sidebar({uid, setSessionDetails, setFeedbackMode }) {

    return (
        <>
        <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">

            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">your pieces</label>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

            {/* Sidebar content here */}
            {/* <SearchBar /> */}

            <Collapsibles 
                uid={uid} 
                setSessionDetails={setSessionDetails} 
                setFeedbackMode={setFeedbackMode}
            />

            </ul>
        </div>
        </div>
        </>
        )
}
