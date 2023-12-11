import Underline from "@tiptap/extension-underline"
import CharacterCount from "@tiptap/extension-character-count"

import { useState } from "react"
import "../App.css"
import { db } from "../config/firebase"
import { setDoc, doc } from "firebase/firestore"
import { Autosave } from "react-autosave"
import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"

  
export default function Tiptap({trackChanges, uid, title, ddmmyyyy, timechosen, setSavePending, setWordCount, pieceType, feedbackMode }) {
  
  const content = '<p><i><u> Write anything... </u><i></p>'
  
  const extensions = [
    StarterKit,
    Underline,
    CharacterCount,
    Link,
  ]
  const [pieceContent, setPieceContent] = useState("")
  
  // condition for tracking changes only when session details have been set
  if (trackChanges) {


    // track changes to the content in an obj with date and time chosen
    let piece = {
      "content" : pieceContent,
      "date" : ddmmyyyy, 
      "timer" : timechosen, 
      }
    
    // save changes to firestore
    function SaveToFirestore() {
      setDoc(doc(db, "users", uid), 
        {[pieceType] : {[title] : piece}}, 
        {merge: true})
      
      // stop the loading circle (is a parent state variable)
      setSavePending(false)
    }


    let editor

    if (feedbackMode || feedbackMode === "") {
      editor = useEditor({
        extensions,
        content,
        }
      )
      editor.commands.setContent(feedbackMode)
      editor.setOptions({editable: false})
    }
    
    else {
      editor = useEditor({
          extensions,
          content,
          onUpdate: ({ editor }) => {
            setPieceContent(editor.getHTML())
            setSavePending(true)
            setWordCount(editor.storage.characterCount.words())
  
          }
         }) 
      editor.setOptions({editable: true})
    }
  

    return (
      <>
        <EditorContent editor={editor} />
        <Autosave data={pieceContent} onSave={SaveToFirestore} />
      </>
    )
  }

  

  // no autosave if not logged in
  else {
    const clientEditor = useEditor({
      extensions,
      content,
      onUpdate: ({ editor }) => {
        setWordCount(editor.storage.characterCount.words())
      }
    })
    // clientEditor.setOptions({editable: true})
    return (
      <>
        <EditorContent editor={clientEditor}/>
      </>
    )
  }
  
}

