/** @format */

import React from 'react';
import Card from './card';

const Controller = ({ posts, props }) => {
	console.log('inhabitants pop: ', props);
	// const [users, setUsers] = useState({});

	if (!posts) {
		return (
			<div>Everyone's off on an Adventure at the moment, please wait...</div>
		);
	}

	return (
		<div className='post-list'>
			{posts.map(post => (
                <Card {...post} id={post.id} post={post} props={props} posts={posts} />
			))}
		</div>
	);
};

export default Controller;
