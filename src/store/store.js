import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import propertyReducer from './reducers/propertyReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
  },
});
