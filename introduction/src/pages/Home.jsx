import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseconfig";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [userUid, setUserUid] = useState("");
  const [todo, setTodo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        getData(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch Todos
  const getData = async (uid) => {
    try {
      const q = query(
        collection(db, "todos"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const todos = [];

      querySnapshot.forEach((doc) => {
        todos.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setTodo(todos);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Todo
  const addTodo = async (event) => {
    event.preventDefault();

    if (!title.trim() || !desc.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const newTodo = {
        uid: userUid,
        title,
        description: desc,
        createdAt: Timestamp.fromDate(new Date()),
      };

      await addDoc(collection(db, "todos"), newTodo);

      setTitle("");
      setDesc("");

      getData(userUid);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Todo
  const deleteTodo = async (docId) => {
    try {
      await deleteDoc(doc(db, "todos", docId));

      getData(userUid);

      console.log("Item Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Todo
  const editTodo = async (docId) => {
    const updatedTitle = prompt("Enter updated title");

    if (!updatedTitle) return;

    try {
      await updateDoc(doc(db, "todos", docId), {
        title: updatedTitle,
      });

      getData(userUid);

      console.log("Title Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Home</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <br />
        <br />

        <button type="submit">Add Todo</button>
      </form>

      <div className="parent">
        {todo.length > 0 ? (
          todo.map((item) => (
            <div
              key={item.id}
              className="children"
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "2px solid black",
                borderRadius: "12px",
              }}
            >
              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <button onClick={() => deleteTodo(item.id)}>
                Delete
              </button>

              <button onClick={() => editTodo(item.id)}>
                Edit
              </button>
            </div>
          ))
        ) : (
          <h3>No Todos Found</h3>
        )}
      </div>
    </>
  );
};

export default Home;