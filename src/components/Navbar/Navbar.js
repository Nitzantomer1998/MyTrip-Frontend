import './Navbar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('username');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const API_URL = 'http://localhost:10000/user/search';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchBy === 'username') {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    } else if (searchBy === 'location') {
      setFilteredUsers(
        users.filter((user) =>
          user.location.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, searchBy, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleLogout = () => {
    navigate('/sign-in');
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-search'>
        <div className='search-input-container'>
          <input
            className='navbar-search-input'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className='navbar-select'
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value='username'>Username</option>
            <option value='location'>Location</option>
          </select>
        </div>
        {searchTerm && (
          <div className='filtered-user-tabs-container'>
            <div className='result-count'>
              <p>{filteredUsers.length} result(s) found(s)</p>
            </div>
            <div className='filtered-user-tabs'>
              {/* {filteredUsers.map((user, index) => (
                <div key={index} className='user-tab'>
                  <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                  {searchBy === 'username' ? user.username : user.location}
                </div>
              ))} */}
              {filteredUsers.map((user, index) => (
                <div key={index} className='user-tab'>
                  <div className='profile-placeholder'></div>
                  {searchBy === 'username' ? user.username : user.location}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
