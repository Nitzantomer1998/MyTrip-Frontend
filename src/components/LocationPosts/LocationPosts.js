import React, { useState, useEffect } from 'react';
import Post from '../post/index';
import { getPostsByLocation } from '../../functions/post';

export default function LocationPosts({ location, user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsByLocation();
  }, [location]);

  const fetchPostsByLocation = async () => {
    const res = await getPostsByLocation(location, user.token); // Utiliser le résultat de la recherche des emplacements
    console.log('Response:', res);
    if (Array.isArray(res)) {
      console.log('Setting posts:', res);
      setPosts(res);
    } else {
      console.log('No posts found');
      setPosts([]);
    }
  };


  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post._id} user={user} comments={post.comments} />
      ))}
    </div>
  );
}
