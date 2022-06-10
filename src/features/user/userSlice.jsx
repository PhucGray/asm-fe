import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
