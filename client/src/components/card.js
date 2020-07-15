import React from 'react';
import axios from 'axios';

const Cards = (post) => {

    const handleDelete = (e, id) => {
        e.preventDefault();
        
        axios
            .delete(`http://localhost:4000/api/posts/${post.id}`)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
    
            .then((res) => {
                console.log('delete', res.data);
            })
    
            .catch((err) =>
                console.error('Issue.js: handleDelete: err: ', err.message, err.response)
            );
        };


    console.log("Card Props: " , post);
	return (
        <div>
		<div>
			<h2>Title: {post.title}</h2>
			<h2>Contents: {post.contents}</h2>
		</div>
        <div>
   <button onClick={handleDelete}>
             Delete
           </button>
        </div>
        </div>
	);
};

export default Cards;
