import React, { useState, useEffect } from 'react';
import Header from '../../components/header/index';
import LocationPosts from '../../components/LocationPosts/LocationPosts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/index';
import './style.css';
import Loading from '../../functions/loading'; // Import the Loading component

export default function LocationPostsPage() {
  const location = useParams().location;
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    // Simulating network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear the timeout in case the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='posts-container-location'>
      <div className='left-home'>
        {' '}
        {/* Ajoutez cette ligne */}
        <LeftHome user={user} /> {/* Ajoutez cette ligne */}
      </div>{' '}
      {/* Ajoutez cette ligne */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className='myposts'>
            <LocationPosts location={location} user={user} />
          </div>
        </>
      )}
    </div>
  );
}
