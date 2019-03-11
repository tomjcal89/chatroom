import axios from 'axios';

import {
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_USERS,
  
} from './types';

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Get all users
export const getUsers = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/user/all')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};


// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
