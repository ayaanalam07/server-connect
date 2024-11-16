import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {




  const inputVal = useRef()
  const [data, setData] = useState([]);
  useEffect(() => {
    axios('http://localhost:2001/users')
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data)
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    axios.post('http://localhost:2001/user', {
      title: inputVal.current.value,
    })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })

    inputVal.current.value = '';

  };

  const editTodo = (id, title) => {
    console.log("edit user");
  
    // Prompt the user for the new title
    const updateTitle = prompt("Update user", title);
  
    // If the user cancels the prompt or leaves it blank, do nothing
    if (!updateTitle || updateTitle.trim() === "") {
      alert("Title cannot be empty!");
      return;
    }
  
    // Send the PUT request to the backend
    axios.put(`http://localhost:2001/user/${id}`, {
        title: updateTitle.trim(), // Trim whitespace from title
      })
      .then((res) => {
        console.log(res.data.data); // Log the server response
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, title: updateTitle.trim() } : item
          )
        );
      })
      .catch((err) => {
        console.error(err); // Log any errors
        alert("Failed to update the todo. Please try again!");
      });
  };
  

  const deleteTodo = (id) => {
    console.log("delete", id);
    axios.delete(`http://localhost:2001/users/${id}`)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }




  return (
    <div>
      <h1>Hello World</h1>
      <form onSubmit={addTodo}>
        <input type="text" ref={inputVal} placeholder="Enter a value" />
        <button type="submit">Submit</button>
      </form>

      {
        data.length > 0 ? (
          data.map((item) => {
            return <div key={item.id}>
              <h1>{item.title}</h1>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => editTodo(item.id, item.title)}>Edit</button>
            </div>
          })
        ) : (
          <h1>No Todo Found</h1>
        )
      }
    </div>
  )
}

export default App