import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const userObject = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  user: userObject ? userObject : null,
  token: token ? token : null, 
  isAuthenticated: token ? true : false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; 
      localStorage.removeItem('token'); 
      localStorage.removeItem('user')
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
