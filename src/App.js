import React, { useRef, useState } from 'react';
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBI3E_8900ttRXF-w8yUy_bjG2A3GT9scs",
    authDomain: "super-duper-chat-5e40f.firebaseapp.com",
    projectId: "super-duper-chat-5e40f",
    storageBucket: "super-duper-chat-5e40f.appspot.com",
    messagingSenderId: "410609379333",
    appId: "1:410609379333:web:a988acdca243ca80e6146c",
    measurementId: "G-31M8C9WD8Q"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <h1>Super Duper Chat</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

const SignOut = () => {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(ev) => {
    ev.preventDefault()

    const { uid } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    })
    setFormValue('')
  }

  return (
    <>
      <div className="msg-container">
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(ev) => setFormValue(ev.target.value)} />
        <button type="submit">Send Message</button>
      </form>
    </>
  )
}

const ChatMessage = props => {
  const { text, uid  } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p className="text">{text}</p>
      </div>
    </>
  )
}

export default App
