import './App.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData} from 'react-firebase-hooks/firestore'

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
  return (
    <div className="App">
      <header className="App-header">
     
      </header>
    </div>
  )
}

export default App
