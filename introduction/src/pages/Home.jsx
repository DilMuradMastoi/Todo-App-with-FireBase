import { onAuthStateChanged } from 'firebase/auth';
import { log } from 'firebase/firestore/pipelines';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { auth } from '../config/firebaseconfig';

const Home = () => {
  const [title , setTitle ] = useState('');
  const [desc , setDesc ] = useState('');
  const [userUid , setUserUid] = useState('');

      const navigate = useNavigate()
      useEffect( () => {
        onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setUserUid(uid)
    // console.log('user uiid =>' , uid);
    
    // https://firebase.google.com/docs/reference/js/auth.user

    // ...
  } else {
      navigate('/login')
    // ...
  }
});
      } , [])

  const addTodo = (event) => {
    event.prevntDefault() ;
    console.log(title , desc);
    
  }
  return (
   <>
   <h1>home {import.meta.env.VITE_PASSWORD} </h1>
   <form >
    <input type="text" placeholder='enter title' value={title}  onChange={(e) => setTitle(e.target.value)} /> <br /><br />
   <textarea placeholder='enter description' value={desc}  onChange={(e) => setDesc(e.target.value)} ></textarea>  <br /><br />
   <button>Add Todo</button>
   </form>
   <div className="parent">
    <div className="children"
    style={{
      margin: '10px 0px',
      padding: '10px' ,
      border: '1px solid black' ,
      borderRadius: '14px',
    }}
    >
      <h2>title: lorem , ipsum</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis obcaecati ad culpa.</p>
    </div>
   </div>
   </>
  )
}

export default Home