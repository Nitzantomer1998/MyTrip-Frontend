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
  const [searchByUser, setSearchByUser] = useState(true);
  const [searchByLocation, setSearchByLocation] = useState(false);
  const [locationResults, setLocationResults] = useState([]); // New state variable for location search results

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
    if (searchTerm.length < 3) {
      // Si moins de trois lettres ont été entrées, effacer les résultats de recherche
      setResults([]);
      setLocationResults([]);
      return;
    }

    if (searchTerm === '') {
      setResults('');
      setLocationResults([]);
    } else {
      if (searchByUser) {
        const res = await search(searchTerm, user.token);
        setResults(res);
      }

      if (searchByLocation) {
        getUniqueLocations(user.token).then((locations) => {
          const matchedLocations = locations.filter((location) =>
            location?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setLocationResults(matchedLocations);
        });
      }
    }
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
    const fetchedPosts = await getPostsByLocation(location, user.token);
    setPosts(fetchedPosts);
  };

  const handleResultClick = () => {
    setShowSearchMenu(false);
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
        <select
          className='search_filter'
          onChange={(e) => {
            setResults([]);
            setLocationResults([]);
            if (e.target.value === 'user') {
              setSearchByUser(true);
              setSearchByLocation(false);
            } else if (e.target.value === 'location') {
              setSearchByUser(false);
              setSearchByLocation(true);
            }
          }}
        >
          <option value='user'>Search by User</option>
          <option value='location'>Search by Location</option>
        </select>

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
            placeholder={searchByUser ? 'Search Users' : 'Search Location'}
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
      {results.length === 0 && locationResults.length === 0 && (
        <div className='search_resultss'>No results Found.</div>
      )}
      {results.length > 0 && (
        <div className='search_results scrollbar'>
          {results.map((user) => (
            <Link
              to={`/profile/${user?.username}`}
              className='search_user_item hover1'
              onClick={() => {
                addToSearchHistoryHandler(user._id);
                handleResultClick(); // Close search menu
              }}
              key={user._id}
            >
              <img src={user.picture} alt='' />
              <span>{user?.username}</span>
            </Link>
          ))}
        </div>
      )}
      {locationResults.length > 0 && (
        <div className='search_results scrollbar'>
          {locationResults.map((location) => (
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
      )}
      {searchByUser && (
        <div className='search_history scrollbar'>
          {searchHistory &&
            searchHistory
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((user) => (
                <div className='search_user_item hover1' key={user._id}>
                  <Link
                    className='flex'
                    to={`/profile/${user?.user?.username}`}
                    onClick={() => {
                      addToSearchHistoryHandler(user.user._id);
                      handleResultClick(); // Close search menu
                    }}
                  >
                    <img src={user.user?.picture} alt='' />
                    <span>{user?.user?.username}</span>
                  </Link>
                  <i
                    className='exit_icon'
                    onClick={() => {
                      handleRemove(user?.user?._id);
                    }}
                  ></i>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
