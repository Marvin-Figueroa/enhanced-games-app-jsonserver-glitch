import { useState } from 'react';
import HttpClient from '../services/http';

const http = new HttpClient();

export async function useAuth(user) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const registeredUser = await http.get(
    process.env.REACT_APP_GLITCH_BASE_URL + `/users?username=${user?.username}`
  )[0];

  if (registeredUser) {
    setIsLoggedIn(
      registeredUser.username === user.username &&
        registeredUser.password === user.password
    );
  }

  if (isLoggedIn) {
    setLoggedInUser(registeredUser);
  }

  return { isLoggedIn, loggedInUser };
}
