import Cookies from 'js-cookie';

const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
export function userReducer(
  state = {
    user: {
      id: user?.id || '',
      message: user?.message || '',
      token: user?.token || '',
      username: user?.username || '',
      picture: user?.picture || '',
      verified: user?.verified || false,
    },
  },
  action
) {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: {
          id: '',
          message: '',
          token: '',
          username: '',
          picture: '',
          verified: false,
        },
      };
    case 'UPDATEPICTURE':
      return { ...state, picture: action.payload };
    case 'VERIFY':
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
