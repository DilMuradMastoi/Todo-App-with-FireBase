import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import React, { useState } from 'react'

const Register = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const registeruser = (event)=> {
        event.preventDefault() 
        console.log(email , password);
        
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
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


    }
  return (
        <>
            <h1>register</h1>
            <form onSubmit={registeruser}>
                <input type="email" placeholder='enter your email' value={email}  onChange={(e) =>  setEmail(e.target.value) } />
                <input type="password" placeholder='enter your password' value={password}  onChange={(e) =>  setPassword(e.target.value) } />
                    <button type='submit'> register</button>
            </form>

        </>
  )
}

export default Register