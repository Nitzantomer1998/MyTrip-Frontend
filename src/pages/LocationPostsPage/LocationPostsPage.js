import React from 'react';
import Header from '../../components/header/index';
import LocationPosts from '../../components/LocationPosts/LocationPosts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/index';
import './style.css';

export default function LocationPostsPage() {
  const location = useParams().location;
  const { user } = useSelector((state) => state.user);
  return (
    <div className='posts-container-location'>
      <Header />
      <div className='myposts'>
        <LocationPosts location={location} user={user} />
      </div>
    </div>
  );
}
