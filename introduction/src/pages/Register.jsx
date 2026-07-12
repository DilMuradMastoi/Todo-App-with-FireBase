import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseconfig';
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 



const Register = () => {

    const [fullname , setFullname ] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const registeruser = async(event)=> {
        event.preventDefault() 
        console.log(email , password);
        
createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    console.log(user);
    const docRef = await addDoc(collection(db, "users"), {
    email , fullname , uid };
  console.log("Document written with ID: ", docRef.id);
    alert('user is registered')
  })
  .catch((error) => {
     console.log(error);
  console.log(error.code);
  console.log(error.message);
    // const errorCode = error.code;
    // const errorMessage = error.message;
  alert('error occured')
  });
  try {
  const docRef = await addDoc(collection(db, "users"), {
    email , fullname , uid
  });
  
} catch (e) {
  console.error("Error adding document: ", e);
}


    }
  return (
        <>
            <h1>register</h1>
            <form onSubmit={registeruser}>
                <input type="text" placeholder='enter your Fullname' value={fullname}  onChange={(e) =>  setFullname(e.target.value) } />
                <input type="email" placeholder='enter your email' value={email}  onChange={(e) =>  setEmail(e.target.value) } />
                <input type="password" placeholder='enter your password' value={password}  onChange={(e) =>  setPassword(e.target.value) } />
                    <button type='submit'> register</button>
            </form>

        </>
  )
}

export default Register