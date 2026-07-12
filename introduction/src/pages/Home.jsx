
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseconfig';
import { useNavigate } from 'react-router';

const Home = () => {
  const [title , setTitle] = useState('');
  const [desc , setDesc] = useState('');

  const navigate = useNavigate()
      useEffect(() => {
          onAuthStateChanged(auth, (user) => {
  if (user) {
 
    const uid = user.uid;
    // console.log('user Uid =>' , uid);
    
    // ...
  } else {
      navigate('/login')
    
  }
});
      } , [])


  const addTodo = (event) => {
    event.preventDefault();
    console.log(title , desc);
    
  }
  return (
    <>
    <h1>Home </h1>
    <form onSubmit={addTodo} >
    <input type="text" placeholder='enter todo' /> <br /><br /><br />
      <textarea placeholder='enter Description'></textarea> <br /><br /><br />
     <button>Add Todo</button>

    </form>

   <div className="parent">
    <div className="children" style={{
      margin: '10px 0px',
      padding: '10px',
      border: '2px solid black',
      borderRadius: '12px'
    }}> 
      <h2>title: Lorem ipsum dolor sit amet.</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quasi itaque exercitationem placeat ratione incidunt voluptates temporibus saepe laudantium vel.</p>
    </div>
   </div>


    </>
  )
}

export default Home