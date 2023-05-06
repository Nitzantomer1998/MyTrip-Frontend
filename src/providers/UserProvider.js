import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function UserProvider({ children }) {
  const tokenLcl = localStorage.getItem('token');

  const decoded = tokenLcl ? parseJwt(tokenLcl) : null;

  const [userDetails, setUserDetails] = useState({
    username: decoded?.username || '',
    email: decoded?.email || '',
    token: tokenLcl || '',
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext, UserDispatchContext };
