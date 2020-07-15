/** @format */

const express = require('express');
//uppercase to CREATE a router, instead of call router method.
const router = express.Router();
const Posts = require('./db.js');
const { OPEN_READWRITE } = require('sqlite3');

//----------------------------------------function(handlers)-------------------------------//

//get posts - WORKS ...

router.get('/', (req, res) => {
	console.log('Get Request for /api/posts');
	Posts.find(req.query)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The posts information could not be retrieved.',
			});
		});
});

//get post by ID - WORKS ...
router.get('/:id', (req, res) => {
	const { id } = req.params;
	Posts.findById(id)
		.then((post) => {
			if (post) {
				req.post = post;
				res.status(200).json(req.post);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

//get comments - WORKS ...
router.get('/:id/:post_id', (req, res) => {
	const { id } = req.params;

	Posts.findPostComments(req.params.id)
		.then((comment) => {
			if (comment) {
				res.status(200).json(comment);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

//post posts - WORKS ...
// States ".returning() is not supported by sqlite3 and will not have any effect"
router.post('/', (req, res) => {
	const PostInfo = req.body;
	Posts.insert(PostInfo)
		.then(() => {
			if (!PostInfo.title) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide title and contents for the post.',
				});
			}

			if (!PostInfo.contents) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide title and contents for the post.',
				});
			}

			// posts.push(PostInfo); //By commenting this out, returns the actual. Otherwise it doesn't state. Post functions regardless provided body has title and contents.
			res.status(201).json(PostInfo);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the post to the database',
			});
		});
});

//post comments - WORKS ...
// First usage of try due to information and errors for .catch
router.post('/:id/comments', (req, res) => {
	const commentInfo = { ...req.body, post_id: req.params.id };
	// Comment.insertComment(messageInfo)
	const { text } = req.body;

	if (!text) {
		res.status(400).json({
			errorMessage: 'Please provide text for the comment.',
		});
	}
	try {
		Posts.insertComment(commentInfo);
		res.status(201).json(commentInfo);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: 'There was an error while saving the comment to the database',
			err,
		});
	}
});
// Delete - Works, but throws error.
router.delete('/:id', (req,res) => {
Posts.remove(req.params.id)
.then((posts) =>{
	if (posts > 0) {
		res.status(200).json({ message: "This post has been deleted"})
	} else {
		res.status(404).json({message: "The post could not be found" });
	}
})
.catch((error)).json({message: "Error removing the post",
error: "The post could not be removed"})
})

//update - Works ..
router.put("/:id", (req, res) => {
	const id = req.params.id;
	const { title, contents } = req.body;
	if (!title || !contents) {
	  res.status(400).json({
		errorMessage: "Please provide title and contents for the post.",
	  });
	} else {
	  const changes = req.body;
	  Posts.update(id, changes)
		.then((post) => {
		  if (post) {
			  res.status(200).json(changes);
		  } else {
			res
			  .status(404)
			  .json({
				message: "The post with the specified ID does not exist.",
			  });
		  }
		})
		.catch((error) => {
		  res.status(500).json({
			message: `Error updating the post ${id}`,
			error: "The post information could not be modified.",
		  });
		});
	}
  });

// FindCommentById() 
router.get('/:id/:post_id', (req, res) => {
	const { id } = req.params;
	const {post_id} = req.params;

	Posts.findCommentById(id)
	.then(comments => {
        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The comments information could not be retrieved."  
        });
    });
});

module.exports = router;
