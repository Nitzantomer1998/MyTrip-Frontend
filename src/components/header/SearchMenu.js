import { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';
import useClickOutside from '../../helpers/clickOutside';
import { getUniqueLocations, getPostsByLocation } from '../../functions/post'; // Import the new API functions

import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from '../../functions/user';
import { Link } from 'react-router-dom';
export default function SearchMenu({ color, setShowSearchMenu, user }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  const [posts, setPosts] = useState([]);

  const [locationResults, setLocationResults] = useState([]); // New state variable for location search results
  console.log(user, 'pooooo');
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const res = await getSearchHistory(user.token);
    setSearchHistory(res);
  };
  useEffect(() => {
    input.current.focus();
  }, []);
  const searchHandler = async () => {
    if (searchTerm === '') {
      setResults('');
      setLocationResults([]);
    } else {
      const res = await search(searchTerm, user.token);
      setResults(res);
    }
    getUniqueLocations(user.token).then((locations) => {
      console.log(locations, 'locations');
      console.log(searchTerm, 'searchTerm');
      console.log(user.token, 'token');
      const matchedLocations = locations.filter((location) =>
        location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLocationResults(matchedLocations);
    });
  };

  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, user.token);
    getHistory();
  };
  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, user.token);
    getHistory();
  };

  const locationSearchHandler = async (location) => {
    console.log('Searching for location:', location);
    const fetchedPosts = await getPostsByLocation(location, user.token);
    setPosts(fetchedPosts);
  };

  return (
    <div className='header_left search_area scrollbar' ref={menu}>
      <div className='search_wrap'>
        <div className='header_logo'>
          <div
            className='circle hover1'
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className='search'
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type='text'
            placeholder='Search Users'
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results == '' && (
        <div className='search_history_header'>
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className='search_history scrollbar'>
        {searchHistory &&
          results == '' &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className='search_user_item hover1' key={user._id}>
                <Link
                  className='flex'
                  to={`/profile/${user?.user?.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user?.picture} alt='' />
                  <span>{user?.user?.username}</span>
                </Link>
                <i
                  className='exit_icon'
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className='search_results scrollbar'>
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user?.username}`}
              className='search_user_item hover1'
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt='' />
              <span>{user?.username}</span>
            </Link>
          ))}
        {locationResults &&
          locationResults.map((location) => (
            <Link
              to={`/location/${location}`}
              className='search_location_item hover1'
              key={location}
              onClick={() => locationSearchHandler(location)} // Ajouter cet onClick
            >
              {location}
            </Link>
          ))}
      </div>
    </div>
  );
}
