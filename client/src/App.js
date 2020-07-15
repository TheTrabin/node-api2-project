import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Controller from './components/controller.js';

import './App.css';

function App() {

  const [posts, setPosts] = useState();

  const postCall = () => {
    axios
    .get('http://localhost:4000/api/posts' )
    .then (res => {
        console.log(res.data);
        setPosts(res.data)
        console.log("Information on posts ", posts)
    })
    .catch (err => {
        console.log("Failed postCall: ", err.message, err.response)
    })
  }
  
  useEffect(() => {
    postCall();
  }, []);

  return (
    <div className="App">
      <Router>
      <Route>
        <Controller posts={posts} />
      </Route>
      </Router>
    </div>
  );
}

export default App;
