import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post';
import './style.css';
import Loading from '../../functions/loading';

export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state.user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();

  useEffect(() => {
    if (middle.current) {
      // Ajouter une vérification ici
      setHeight(middle.current.clientHeight);
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <LeftHome user={user} />
      <Header page='home' getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        <CreatePost user={user} setVisible={setVisible} />
        <div className='posts'>
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
