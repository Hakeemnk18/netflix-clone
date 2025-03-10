
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut
    } from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsPw1cSnSmrpc3KfjmsDSHxpvV0CWMVzI",
  authDomain: "netflix-clone-85161.firebaseapp.com",
  projectId: "netflix-clone-85161",
  storageBucket: "netflix-clone-85161.firebasestorage.app",
  messagingSenderId: "870383299604",
  appId: "1:870383299604:web:1ec80a301983c2ed0a0b01"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name,email,password)=>{
    try {
        
        const res = await createUserWithEmailAndPassword(auth,email,password);
        console.log("user created")
        const user = res.user
        console.log(user)
        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
        })
        console.log("add doc")

    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }
}

const login = async (email,password)=>{
    try {
        console.log("inside login")
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }
}

const logout = async ()=>{
    try {
        await signOut(auth)
    } catch (error) {
        console.log("error in signOut ",error.message)
    }
}

export {
    auth,
    db,
    login,
    logout,
    signup
}