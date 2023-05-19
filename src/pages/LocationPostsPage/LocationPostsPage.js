import React from 'react';
import Header from '../../components/header/index';
import LocationPosts from '../../components/LocationPosts/LocationPosts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/index';
import './style.css';

export default function LocationPostsPage() {
  const location = useParams().location;
  const { token, user } = useSelector((state) => state.user); // Ajoutez la déconstruction de 'user' ici
  console.log('Location:', location);
  console.log('Token:', token);
  return (
    <div className='posts-container-location'>
      <Header />

      <LocationPosts location={location} token={token} />
    </div>
  );
}
