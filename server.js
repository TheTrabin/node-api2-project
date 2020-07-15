/** @format */

const express = require('express');
const postsRouter = require('./data/posts-router.js');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);


//------------------------------------------base-------------------------------------------------//
server.get('/', (req, res) => {
	res.send(`
    <h2>Postings</h2>
  `);
});

module.exports = server;