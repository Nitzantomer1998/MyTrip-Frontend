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
    const sortedPosts = [...res].sort(
      (a, b) => b.likes.length - a.likes.length
    );

    if (Array.isArray(sortedPosts)) {
      setPosts(sortedPosts);
    } else {
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
