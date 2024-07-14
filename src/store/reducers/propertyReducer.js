import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: JSON.parse(localStorage.getItem("properties")) || [],
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("properties", JSON.stringify(state.properties));
    },
    addProperty: (state, action) => {
      state.properties.push(action.payload);
      localStorage.setItem("properties", JSON.stringify(state.properties));
    },
    deleteProperty(state, action) {
      state.properties = state.properties.filter(
        (property) => property._id !== action.payload
      );
    },
    updateProperty(state, action) {
      const updatedProperty = action.payload;
      const index = state.properties.findIndex(
        (property) => property._id === updatedProperty._id
      );
      if (index !== -1) {
        state.properties[index] = updatedProperty;
        localStorage.setItem("properties", JSON.stringify(state.properties));
      }
    },
  },
});

export const { setProperties, addProperty, deleteProperty, updateProperty } = propertySlice.actions;

export default propertySlice.reducer;
