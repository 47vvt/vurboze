import { useState, useEffect } from "react";

function Timer({initSec, initMin}) {
    const [seconds, setSeconds] = useState(initSec)
    const [minutes, setMinutes] = useState(initMin)

    useEffect(() => {
        const countdownInterval = setInterval(() => {
          if (seconds > 0) {
            setSeconds((s) => s - 1)
          } else {
            if (minutes > 0) {
              setMinutes((m) => m - 1)
              setSeconds(59);
            } 
            // else {
            //   clearInterval(countdownInterval);
            // }
          }
        }, 1000)

        return () => clearInterval(countdownInterval)
    }, [minutes, seconds])

    return (
        <>
        <b>
        <span className="countdown text-xl">
            <span style={{"--value":minutes}}/>
            <span style={{"--value":seconds}}/>
        </span>
        </b>
        </>
    )
}

function WordCount({wordCount}) {
  const wordcountStr = wordCount.toString();
  let half1, half2

  if (wordcountStr.length === 4) {
    half1 = parseInt(wordcountStr.slice(0, 2), 10)
    half2 = parseInt(wordcountStr.slice(2), 10)
  } else if (wordcountStr.length === 3) {
    half1 = (parseInt(wordcountStr[0], 10))
    half2 = (parseInt(wordcountStr.slice(1), 10))
  } else if (wordcountStr.length === 2 || wordcountStr.length === 1) {
    half1 = (0)
    half2 = (parseInt(wordcountStr, 10))
  }

  return (
    <>
    <b>
    <span className="countdown text-xl">
      <span style={{"--value":half1}}/>
      <span style={{"--value":half2}}/>
    </span>
    </b>
    </>
)
}

export default function BottomBar({initSec, initMin, wordCount, barOff}) {
    if (barOff) {
      return null
    }
    else if (!initSec || !initMin) {
      return (
        <>
        <div className="fixed inset-x-0 bottom-0 flex justify-center pb-8">
            <div className="badge badge-neutral w-15 h-8">
              <WordCount wordCount={wordCount}/>
            </div>
        </div>
        </>
      )
    }
    return (
    <>
    <div className="fixed inset-x-0 bottom-0 flex justify-center pb-8">
        <div className="badge badge-neutral w-15 h-8">
          <div className="pr-2">
            <WordCount wordCount={wordCount}/>
          </div>
          <div className="pl-2">
            <Timer initSec={initSec} initMin={initMin}/>
          </div>

        </div>
    </div>
    </>
    )
}